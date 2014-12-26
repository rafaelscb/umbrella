/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

=============================================================================*/

#ifndef UMSERVER_LIB_H
#define UMSERVER_LIB_H

#define UMSERVER_VERSION "Debut"

#include <stdio.h>    // required for FILE
#include <stddef.h>   // required for size_t

#ifdef __cplusplus
extern "C" {
#endif // __cplusplus

// This structure contains information about HTTP request.
struct ht_connection
{
  const char *request_method; // "GET", "POST", etc
  const char *uri;            // URL-decoded URI
  const char *http_version;   // E.g. "1.0", "1.1"
  const char *query_string;   // URL part after '?', not including '?', or NULL

  char remote_ip[48];         // Max IPv6 string length is 45 characters
  char local_ip[48];          // Local IP address
  unsigned short remote_port; // Client's port
  unsigned short local_port;  // Local port number

  int num_headers;            // Number of HTTP headers
  struct ht_header
  {
    const char *name;         // HTTP header name
    const char *value;        // HTTP header value
  } http_headers[30];

  char *content;              // POST (or websocket message) data, or NULL
  size_t content_len;         // Data length

  int is_websocket;           // Connection is a websocket connection
  int status_code;            // HTTP status code for HTTP error handler
  int wsbits;                 // First byte of the websocket frame
  void *server_param;         // Parameter passed to ht_add_uri_handler()
  void *connection_param;     // Placeholder for connection-specific data

  void *callback_param;       // Needed by ht_iterate_over_connections()
};

struct ht_server; // Opaque structure describing server instance
enum ht_result { MG_FALSE, MG_TRUE, MG_MORE };
enum ht_event
{
  MG_POLL = 100,  // Callback return value is ignored
  MG_CONNECT,     // If callback returns MG_FALSE, connect fails
  MG_AUTH,        // If callback returns MG_FALSE, authentication fails
  MG_REQUEST,     // If callback returns MG_FALSE, Mongoose continues with req
  MG_REPLY,       // If callback returns MG_FALSE, Mongoose closes connection
  MG_CLOSE,       // Connection is closed, callback return value is ignored
  MG_WS_HANDSHAKE,  // New websocket connection, handshake request
  MG_HTTP_ERROR   // If callback returns MG_FALSE, Mongoose continues with err
};
typedef int (*ht_handler_t)(struct ht_connection *, enum ht_event);

// Websocket opcodes, from http://tools.ietf.org/html/rfc6455
enum
{
  WEBSOCKET_OPCODE_CONTINUATION = 0x0,
  WEBSOCKET_OPCODE_TEXT = 0x1,
  WEBSOCKET_OPCODE_BINARY = 0x2,
  WEBSOCKET_OPCODE_CONNECTION_CLOSE = 0x8,
  WEBSOCKET_OPCODE_PING = 0x9,
  WEBSOCKET_OPCODE_PONG = 0xa
};

// Server management functions
struct ht_server *ht_create_server(void *server_param, ht_handler_t handler);
void ht_destroy_server(struct ht_server **);
const char *ht_set_option(struct ht_server *, const char *opt, const char *val);
int ht_poll_server(struct ht_server *, int milliseconds);
const char **ht_get_valid_option_names(void);
const char *ht_get_option(const struct ht_server *server, const char *name);
void ht_set_listening_socket(struct ht_server *, int sock);
int ht_get_listening_socket(struct ht_server *);
void ht_iterate_over_connections(struct ht_server *, ht_handler_t, void *);
void ht_wakeup_server(struct ht_server *);
void ht_wakeup_server_ex(struct ht_server *, ht_handler_t, const char *, ...);
struct ht_connection *ht_connect(struct ht_server *, const char *, int, int);

// Connection management functions
void ht_send_status(struct ht_connection *, int status_code);
void ht_send_header(struct ht_connection *, const char *name, const char *val);
void ht_send_data(struct ht_connection *, const void *data, int data_len);
void ht_printf_data(struct ht_connection *, const char *format, ...);

int ht_websocket_write(struct ht_connection *, int opcode,
                       const char *data, size_t data_len);
int ht_websocket_printf(struct ht_connection* conn, int opcode,
                        const char *fmt, ...);

// Deprecated in favor of ht_send_* interface
int ht_write(struct ht_connection *, const void *buf, int len);
int ht_printf(struct ht_connection *conn, const char *fmt, ...);

const char *ht_get_header(const struct ht_connection *, const char *name);
const char *ht_get_mime_type(const char *name, const char *default_mime_type);
int ht_get_var(const struct ht_connection *conn, const char *var_name,
               char *buf, size_t buf_len);
int ht_parse_header(const char *hdr, const char *var_name, char *buf, size_t);
int ht_parse_multipart(const char *buf, int buf_len,
                       char *var_name, int var_name_len,
                       char *file_name, int file_name_len,
                       const char **data, int *data_len);

// Utility functions
void *ht_start_thread(void *(*func)(void *), void *param);
char *ht_md5(char buf[33], ...);
int ht_authorize_digest(struct ht_connection *c, FILE *fp);
int ht_url_encode(const char *src, size_t s_len, char *dst, size_t dst_len);
int ht_url_decode(const char *src, int src_len, char *dst, int dst_len, int);

// Templates support
struct ht_expansion
{
  const char *keyword;
  void (*handler)(struct ht_connection *);
};
void ht_template(struct ht_connection *, const char *text,
                 struct ht_expansion *expansions);

#ifdef __cplusplus
}
#endif // __cplusplus

#endif // UMSERVER_LIB_H
