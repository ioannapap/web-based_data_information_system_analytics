# -*- coding: utf-8 -*-

# -- Project information -----------------------------------------------------

project = 'Murders Analytics'
copyright = ''
author = ''

version = 'v0.1.1'
release = 'v0.1.1'
extensions = ['recommonmark', 'sphinx.ext.intersphinx']
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'
language = None
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']
pygments_style = None
html_theme = "sphinx_rtd_theme"
html_theme_options = {
    'logo_only': True,
    'display_version': True,
    'style_nav_header_background': '#212529;',
    'collapse_navigation': False,
    'sticky_navigation': True,
    'navigation_depth': 2,
    'includehidden': True,
    'titles_only': False
}
html_logo = ""
html_static_path = ['_static']
htmlhelp_basename = 'murders_analytics_doc'

latex_elements = {
    # The paper size ('letterpaper' or 'a4paper').
    #
    # 'papersize': 'letterpaper',

    # The font size ('10pt', '11pt' or '12pt').
    #
    # 'pointsize': '10pt',

    # Additional stuff for the LaTeX preamble.
    #
    # 'preamble': '',

    # Latex figure (float) alignment
    #
    # 'figure_align': 'htbp',
}

latex_documents = [
    (master_doc, 'murders_analytics.tex', 'Murders Analytics - Documentation',
     'CSE, UOI', 'manual'),
]

man_pages = [
    (master_doc, 'murders_analytics', 'Murders Analytics Documentation',
     [author], 1)
]

texinfo_documents = [
    (master_doc, 'murders_analytics', 'Murders Analytics Documentation',
     author, 'murders_analytics', 'Web app for analytics related to murders',
     'Miscellaneous'),
]

epub_title = project
epub_exclude_files = ['search.html']
html_show_sourcelink = False
html_last_updated_fmt = "%b %d, %Y"
