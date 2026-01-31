export default function getCodeNavigationId(title: string, _id: string) {
  return title.trim()
    ? title
        .trim()
        .toLowerCase()
        .replaceAll(/[^a-zA-Z0-9_]/g, '_')
        .replaceAll(/_+/g, '_') +
        '_' +
        _id
    : `untitled_${_id}`;
}
