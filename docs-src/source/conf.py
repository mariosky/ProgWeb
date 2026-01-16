# Configuration file for the Sphinx documentation builder.
#
# For the full list of built-in configuration values, see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Project information -----------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#project-information



project = 'Programción Web'
copyright = '2026, J Mario García Valdez'
author = 'J Mario García Valdez'
release = '2026-1'

# -- General configuration ---------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#general-configuration

extensions = ['sphinxcontrib.bibtex','sphinx_copybutton', ]
copybutton_prompt_text = r">>>|\.\.\."
copybutton_prompt_is_regexp = True
bibtex_bibfiles = ['biblio.bib']

templates_path = ['_templates']


# -- Options for HTML output -------------------------------------------------
# https://www.sphinx-doc.org/en/master/usage/configuration.html#options-for-html-output

html_theme = 'sphinx_book_theme'
html_static_path = ['_static']
html_title = 'Programción Web'

exclude_patterns = []

language = 'es-mx'


