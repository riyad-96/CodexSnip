export type EditorValuesType = {
  title: string;
  description: string;
  code: string;
  language: string;
  theme: string;
};

export type EditorUpdateValuesType = EditorValuesType & {
  code_block_id: string;
};

export type DeleteInfoType = {
  code_block_title: string;
  code_block_id: string;
  folder_id: string;
};

export type CodePartialsType = {
  _id: string;
  title: string;
  language: string;
};
