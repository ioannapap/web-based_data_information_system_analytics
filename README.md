# Murders analytics


## Documentation

If you want to start contributing to this manual you need to setup the required dependencies
and get yourself comfortable with `reStructuredText` format.

This manual is built using `Sphinx` you can read more on their website http://www.sphinx-doc.org/en/master/ for development environment setup.

This are the required steps if you're on a Debian based os.

```bash
# install sphinx dependencies
apt install python3 python3-pip
pip3 install -r requirements.pip

# install latex if you also want to build PDFs
apt install texlive-full latexmk
```

Visual studio code has a nice plugin for Sphinx where which you can use.

Run development server

```bash
sphinx-autobuild -b html . _build/
```

Building

```bash
make latexpdf # build a pdf
make html     # build html
```
