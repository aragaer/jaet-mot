SUBDIRS=src
xpi: all
	-rm -rf `pwd`/xpi $(PACKAGE).xpi
	mkdir `pwd`/xpi
	make DESTDIR=`pwd`/xpi install
#minor cleanup
	sed -i -e '/content wrapper/d' -e '/locale branding/d' \
	    `pwd`/xpi$(pkgdatadir)/chrome.manifest
	(cd `pwd`/xpi$(pkgdatadir) && zip -r $(PACKAGE).xpi chrome components install.rdf chrome.manifest icon.png)
	mv `pwd`/xpi$(pkgdatadir)/$(PACKAGE).xpi `pwd`
	rm -rf `pwd`/xpi
