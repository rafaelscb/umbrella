/*=============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All rights reserved.

  For more details, visit http://juston.co/umbrella

==============================================================================*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <wchar.h>
#include <dirent.h>
#include <sys/stat.h>

#define SIZEOF(a) sizeof(a) / sizeof((a)[0])

int takesrcpath(const char *fname, const char *include);
void walk(const char *fname);
void addtoincs(const char *fname);
void addtonames(const char *fname);
void addsayings(const char *root);
void writeto(const char *fname, FILE *fpout);
void showhelp();
int comparator(const void *p1, const void *p2);

char **incs = 0;
int incslen = 0, incssize = 0;
char **names = 0;
int nameslen = 0, namessize = 0;
char *src_path = 0;
char *res_path = 0;
char *entry = 0;
char *lang = 0;
FILE *out_js = 0, *out_css = 0;

int main(int argc, char *argv[])
{
  int i = 1, j = 0;
  int flag = 0;
  char *ptr;

  if (argc == 1 || !strcmp(argv[1], "-h")) showhelp();
  else
  {
    entry = argv[i++];
    lang = argv[i++];
    res_path = argv[i];

    while (i++ < (argc - 1))
    {
      if (!strcmp(argv[i], "-out_js")) out_js = fopen(argv[++i], "w");
      else if (!strcmp(argv[i], "-out_css")) out_css = fopen(argv[++i], "w");
    }
    if (!out_js) out_js = stdout;

    walk(entry);
    addtoincs(entry);

    fprintf(out_js, "%s", "\
function inherit(childCtor, parentCtor) {\
/** @constructor */\
function tempCtor() {};\
tempCtor.prototype = parentCtor.prototype;\
childCtor.prototype = new tempCtor();\
/** @override */\
childCtor.prototype.constructor = childCtor;\
}; function include(jsFile) {};\
if (!String.prototype.format) {\
String.prototype.format = function() {var args = arguments;\
return this.replace(/{(\\d+)}/g, function(match, number) {\
return typeof args[number] != 'undefined' ? args[number] : match;});};}\
if (!String.prototype.paddingLeft) { String.prototype.paddingLeft =\
function(paddingValue) { return String(paddingValue + this).slice(\
-paddingValue.length); };}");

    if (strcmp("multi", lang)) fprintf(out_js, "var lang = '%s';", lang);
    else fprintf(out_js, "var lang = '%s';", "");

    fprintf(out_js, "var RES_PATH = '%s';", res_path);

    qsort(names, namessize, sizeof(char*), comparator);
    for (i = 0; i < namessize; i++)
    {
      for (j = 0; j < (int)strlen(names[i]); j++)
      {
        if (names[i][j] == '.')
        {
          flag = 1;
          break;
        }
      }
      if (!flag) fprintf(out_js, "var %s = new Object();\n", names[i]);
      else fprintf(out_js, "%s = new Object();\n", names[i]);
      free(names[i]);
      flag = 0;
    }
    free(names);

    for (i = 0; i < incssize; i++)
    {
      if (ptr = strrchr(incs[i], '.'))
      {
        if (out_js && !strcmp(ptr, ".js")) writeto(incs[i], out_js);
        else if (out_css && !strcmp(ptr, ".css")) writeto(incs[i], out_css);
      }
      free(incs[i]);
    }
    free(incs);

    fclose(out_js);
    if (out_css) fclose(out_css);
    if (src_path) free(src_path);
  }

  return 0;
}

void walk(const char *fname)
{
  FILE *fp;
  char *include = "include ( |";
  char *buffer = 0, *buffer2 = 0, *buffer3 = 0; int buflen = 0;
  char *bufsay = 0, *bufp = 0, *startbuf = 0;
  int i = 0, ininc = 0, incomm = 0, incomn = 0, size = 0;
  char bch, ch = 1;

  if (fp = fopen(fname, "r"))
  {
    if (buffer = (char *)malloc(buflen = strlen(fname) + 100))
    {
      while ((bch = ch) && (ch = fgetc(fp)) != -1)
      {
        if (!incomm && bch == '/' && ch == '*') { incomm = 1; continue; }
        if (incomm && bch == '*' && ch == '/') { incomm = 0; continue; }
        if (!incomn && bch == '/' && ch == '/') { incomn = 1; continue; }
        if (incomn && ch == '\n') { incomn = 0; continue; }

        if (!incomm && !incomn)
        {
          if (!ininc)
          {
            if (include[i] == ' ')
            {
              if (isspace(ch)) continue;
              i++;
            }
            if (include[i] == ch) i++;
            else
            {
              if (include[i] == '|' && (ch == '\'' || ch == '"'))
              {
                ininc = 1;
                size = 0;
              }
              i = 0;
            }
          }
          else
          {
            if (ch == '\'' || ch == '"')
            {
              if (!src_path && !(buffer[size] = '\0') &&
                  !takesrcpath(fname, buffer)) break;
              buffer[size] = '\0'; addtonames(buffer); buffer[size] = ' ';
              memmove(buffer + strlen(src_path), buffer, size);
              strncpy(buffer, src_path, strlen(src_path));
              buffer[size + strlen(src_path)] = '\0';

              walk(buffer);
              addtoincs(buffer);

              if (!strcmp("Sayings/Base.js", (buffer + strlen(src_path))))
              {
                buffer3 = (char*)malloc(strlen(entry) +
                    strlen("/Sayings/") + strlen(lang) + 1);
                buffer2 = (char*)malloc(strlen(entry) +
                    strlen("/Sayings/") + strlen(lang) + 1);
                bufsay = (char*)malloc(strlen(entry) +
                    strlen("/Sayings/") + strlen(lang) + 1);
                startbuf = bufsay;

                if (buffer2 && bufsay)
                {
                  strcpy(buffer2, src_path);
                  strcpy(bufsay, entry);
                  bufp = strrchr(bufsay, '/');
                  if (bufp) bufsay[bufp - bufsay + 1] = '\0';
                  bufsay += strlen(src_path);

                  while (strlen(bufsay) > 0)
                  {
                    bufp = strchr(bufsay, '/');
                    if (!bufp) bufp = strchr(bufsay, '\0');

                    if (bufp)
                    {
                      if (bufp[0] == '/') bufp++;
                      strncat(buffer2, bufsay, bufp - bufsay);
                      bufsay = bufp;
                    }

                    strcpy(buffer3, buffer2);
                    strcat(buffer3, "Sayings");
                    if (strcmp(lang, "multi"))
                    {
                      strcat(buffer3, "/");
                      strcat(buffer3, lang);
                    }

                    addsayings(buffer3);
                  }

                  if (buffer3) free(buffer3);
                  if (buffer2) free(buffer2);
                  if (startbuf) free(startbuf);
                }
              }

              ininc = 0;
              continue;
            }
            if (((buflen - strlen(fname)) - size) <= 2)
            {
              buflen = 2 * size;
              if (!(buffer = (char *)realloc(buffer, buflen))) break;
            }
            buffer[size++] = ch;
          }
        }
      }
    }

    if (buffer) free(buffer);
    else fprintf(stderr, "Memory not allocated");

    fclose(fp);
  }
  else fprintf(stderr, "Error opening: %s\n", fname);
}

int takesrcpath(const char *fname, const char *include)
{
  char *buffer;
  int i = strlen(fname), r = 0;

  if (buffer = (char *)malloc(i + strlen(include)))
  {
    do
    {
      if (fname[i] == '/' || fname[i] == '\\')
      {
        *buffer = '\0';
        strncat(buffer, fname, i+1);
        strcat(buffer, include);

        if (access(buffer, 0) != -1)
        {
          addtonames(fname+i+1);

          if (src_path = (char *)malloc(i + 2))
          {
            r = 1; *src_path = '\0';
            strncat(src_path, fname, i + 1);
          }
          else fprintf(stderr, "Memory not allocated");
          break;
        }
      }
    }
    while (i-- > 0);

    free(buffer);
  }
  else fprintf(stderr, "Memory not allocated");

  return r;
}

void addtoincs(const char *fname)
{
  int i = 0;
  for (i = 0; i < incssize; i++)
  {
    if (strcmp(incs[i], fname) == 0) return;
  }
  if ((incslen - incssize) <= 2)
  {
    incslen += 50;
    incs = (char **)realloc(incs, incslen * (sizeof *incs));
  }
  if (incs && (incs[incssize] = (char *)malloc(strlen(fname) + 1)))
  {
    strcpy(incs[incssize++], fname);
  }
  else fprintf(stderr, "Memory not allocated");
}

void addtonames(const char *nsp)
{
  int i = 0, j = 0, flag = 0;
  char *buffer = (char*)malloc(strlen(nsp) + 1);
  strcpy(buffer, nsp);

  for (i = strlen(buffer)-1; i > 0; i--)
  {
    if (buffer[i] == '\\' || buffer[i] == '/')
    {
      if (!flag)
      {
        buffer[i] = '\0';
        flag = 1;
      }
      else
      {
        buffer[i] = '.';
        flag++;
      }
    }
  }

  if (flag)
  {
    for (i = strlen(buffer); i >= 0; i--)
    {
      if (buffer[i] == '\0' || buffer[i] == '.')
      {
        buffer[i] = '\0';

        for (j = 0; j < namessize; j++)
        {
          if (strcmp(names[j], buffer) == 0)
          {
            free(buffer);
            return;
          }
        }

        if ((nameslen - namessize) <= 2)
        {
          nameslen += 50;
          names = (char **)realloc(names, nameslen * (sizeof *names));
        }
        if (names && (names[namessize] = (char *)malloc(strlen(buffer) + 1)))
        {
          strcpy(names[namessize++], buffer);
        }
        else fprintf(stderr, "Memory not allocated");
      }
    }
  }

  free(buffer);
}

void addsayings(const char *root)
{
  DIR *dir;
  struct dirent *entry;
  struct stat info;
  char *path = 0, *ptr = 0;
  int size = 0, csize = 0;

  if (dir = opendir(root))
  {
    if (path = (char*)malloc(size = strlen(root) + 50))
    {
      while (entry = readdir(dir))
      {
        if (entry->d_name[0] != '.' &&
            (!(ptr = strrchr(entry->d_name, '.')) || !strcmp(ptr, ".js")))
        {
          csize = strlen(root) + strlen(entry->d_name);
          if (csize > size)
          {
            size = 2 * csize;
            if (!(path = (char*)realloc(path, size))) break;
          }

          strcpy(path, root);
          strcat(strcat(path, "/"), entry->d_name);
          stat(path, &info);

          if ((info.st_mode & S_IFMT) == S_IFDIR) addsayings(path);
          else if (ptr) { addtoincs(path); printf("%s\n", path); }
        }
      }
    }

    closedir(dir);
  }
}

void writeto(const char *fname, FILE *fpout)
{
  FILE *fp;
  char ch;

  if (fp = fopen(fname, "r"))
  {
    while ((ch = fgetc(fp)) != -1)
    {
      fprintf(fpout, "%c", ch);
    }
    fclose(fp);
  }
  else fprintf(stderr, "Error opening: %s\n", fname);
}

void showhelp()
{
  printf("\
Usage: umcomp.exe [ENTRY_POINT] -out_js [OUTPUT_JAVASCRIPT] -out_css [OUTPUT_CSS]\n\
Take the [ENTRY_POINT] and the subsequent included files, and compile using \
the [COMPILATION_LEVEL]. The final results are output to [OUTPUT_JAVASCRIPT] \
and [OUTPUT_CSS] files, respectively. If no output file is specified, the \
compiled JavaScript is output to STDOUT.\n\n\
Example 1: umcomp.exe ./src/store/main.js -out_js ./out/store.min.js -out_css ./out/store.min.css\n\n\
Example 2: umcomp.exe ./src/store/main.js > ./out/store.min.js\n");
}

int comparator(const void *p1, const void *p2)
{
  char *str1 = *(char**)p1;
  char *str2 = *(char**)p2;
  return strcmp(str1, str2);
}
