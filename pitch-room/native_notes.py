"""Remove presenter-note payloads while preserving slide artwork and movies."""
from lxml import etree as E

P = 'http://schemas.openxmlformats.org/presentationml/2006/main'


def without_presenter_notes(package):
    data = dict(package)
    for name in list(data):
        if name.startswith(('ppt/notesSlides/', 'ppt/notesMasters/')):
            del data[name]
    for name in list(data):
        if not (name.endswith('.rels') or name in ('ppt/presentation.xml', '[Content_Types].xml', 'docProps/app.xml')):
            continue
        root = E.fromstring(data[name])
        changed = False
        for node in list(root):
            if (node.get('Type', '').endswith(('/notesSlide', '/notesMaster'))
                    or node.get('PartName', '').startswith(('/ppt/notesSlides/', '/ppt/notesMasters/'))
                    or node.tag == '{' + P + '}notesMasterIdLst'):
                root.remove(node)
                changed = True
            elif name == 'docProps/app.xml' and E.QName(node).localname == 'Notes':
                node.text = '0'
                changed = True
        if changed:
            data[name] = E.tostring(root, xml_declaration=True, encoding='UTF-8', standalone=True)
    return data
