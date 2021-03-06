/*============================================================================

  This file is part of the Umbrella project.
  Copyright (C) The Juston.co Owners - All Rights Reserved.

  For more details, visit http://juston.co/umbrella

============================================================================*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <errno.h>
#include <dirent.h>
#include <sys/stat.h>
#include <ctype.h>

void walk(const char *root);
void adddep(const char *jsfile);
void addsayings(const char *root);
void showhelp();

char *srcpath = 0;
char *respath = 0;
char *lang = 0;
char *curlib = 0;
int main(int argc, char *argv[])
{
  int b = 0;
  int n = 0;

  if (argc == 1 || !strcmp(argv[1], "-h"))
  {
    showhelp();
  }
  else if (argc >= 4)
  {
    srcpath = argv[1];
    respath = argv[2];
    lang = argv[3];
    b = strlen(srcpath) - 1;
    if (strchr("/\\", srcpath[b])) srcpath[b] = 0;
    fprintf(stdout, "// THIS FILE IS AUTO-GENERATED BY UMDEPS.\n");
    fprintf(stdout, "SRC_PATH = '%s';\n", srcpath);
    fprintf(stdout, "RES_PATH = '%s';\n", respath);
    if (strcmp(lang, "multi"))
    {
      fprintf(stdout, "lang = '%s';\n", lang);
    }

    if (argc <= 4)
    {
      walk(srcpath);
    }
    else
    {
      b = 0;
      for (n = 4; n < argc; n++)
      {
        if (((strlen(srcpath)+strlen(argv[n])) > (size_t)b))
        {
          b = (strlen(srcpath) + strlen(argv[n])) * 2;
          if (!(curlib = (char*)realloc(curlib, b))) break;
        }
        strcpy(curlib, srcpath);
        strcat(curlib, "/");
        strcat(curlib, argv[n]);
        walk(curlib);
      }

      free(curlib);
    }
  }

  return 0;
}

void walk(const char *root)
{
  DIR *dir;
  struct dirent *entry;
  struct stat info;
  char *path = 0, *ptr = 0;
  int size = 0, csize = 0;

  if (dir = opendir(root))
  {
    if (path = (char *)malloc(size = strlen(root) + 50))
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
            if (!(path = (char *)realloc(path, size))) break;
          }

          strcpy(path, root);
          strcat(strcat(path, "/"), entry->d_name);
          stat(path, &info);

          if ((info.st_mode & S_IFMT) == S_IFDIR) walk(path);
          else if (ptr) adddep(path);
        }
      }
    }

    closedir(dir);

    if (path) free(path);
    else fprintf(stderr, "Memory not allocated");
  }
  else fprintf(stderr, "Error opening: %s\n", root);
}

void adddep(const char *jsfile)
{
  FILE *fp;
  char *include = "include ( |";
  char *saybase = "Sayings/Base.js";
  char *buffer = 0;
  int saycnt = 0;
  int i = 0, ininc = 0, incomm = 0, incomn = 0;
  char bch, ch = 1;

  if (fp = fopen(jsfile, "r"))
  {
    fprintf(stdout, "addDep('%s', [", (jsfile + strlen(srcpath) + 1));
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
              fprintf(stdout, "'");
            }
            i = 0;
          }
        }
        else
        {
          if (ch == '\'' || ch == '"')
          {
            fprintf(stdout, "',");
            ininc = 0;
            if (saycnt == 15)
            {
              buffer = (char*)malloc(strlen(curlib) +
                  strlen("/Sayings/") + strlen(lang) + 1);
              if (buffer)
              {
                strcpy(buffer, curlib);
                strcat(buffer, "/Sayings");
                if (strcmp(lang, "multi"))
                {
                  strcat(buffer, "/");
                  strcat(buffer, lang);
                }
                addsayings(buffer);
                free(buffer);
              }
            }
            saycnt = 0;
            continue;
          }
          if (saybase[saycnt] == ch) saycnt++;
          else saycnt = 0;
          fprintf(stdout, "%c", ch);
        }
      }
    }
    fprintf(stdout, "]);\n");
    fclose(fp);
  }
  else fprintf(stderr, "Error opening: %s\n", jsfile);
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
          else if (ptr) fprintf(stdout, "'%s',", (path + strlen(srcpath) + 1));
        }
      }
    }

    closedir(dir);

    if (path) free(path);
    else fprintf(stderr, "Memory not allocated");
  }
  else fprintf(stderr, "Error opening: %s\n", root);
}

void showhelp()
{
  printf("\
Usage: umdeps.exe [INPUT_PATH] [LIBRARY_1] [LIBRARY_2] [LIBRARY_N]\n\
Calculate the dependency graph from [INPUT_PATH] directory, considering only\n\
the LIBRARY_N libraries, and output the result to STDOUT.\n\n\
Example: umdeps.exe scripts > deps.js\n");
}
