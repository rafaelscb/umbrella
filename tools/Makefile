all: umcomp umdeps umserver

umcomp: umcomp.o
	gcc -o ./umcomp umcomp.o

umcomp.o: umcomp.c
	gcc -o umcomp.o -c umcomp.c

umdeps: umdeps.o
	gcc -o ./umdeps umdeps.o

umdeps.o: umdeps.c
	gcc -o umdeps.o -c umdeps.c

umserver: htlib.o umserver.o
	gcc -pthread -o ./umserver htlib.o umserver.o

htlib.o: htlib.c
	gcc -o htlib.o -c htlib.c

umserver.o: umserver.c
	gcc -o umserver.o -c umserver.c

dist:
	cd ~/Documents/umbrella; \
		zip -r UMBRELLA_linux.zip . -x \
			"work/demos/pacman/*" \
			"work/bluejeans/*" \
			"work/juston/*" \
			"work/armazem/*" \
			"work/demos/pacman.html" \
			"results/*.*" \
			"tools/*.c" \
			"tools/*.h" \
			"tools/*.o" \
			"tools/*.obj" \
			"tools/*.exe" \
			"tools/php/*" \
			"tools/Makefile" \
			"tools/Makefile.win32" \
			".git/*" \
			".gitignore" \
			"*.bat" \
			"*.zip" \
			"README" \
			; \
		cd -

clean:
	rm -rf *.o

cleanall: clean
	rm -rf ./umcomp ./umdeps ./umserver
