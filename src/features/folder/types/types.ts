export type Block = {
  _id: string;
  uid: string;
  folder_id: string;
  email: string;
  title: string;
  description: string;
  code: string;
  language: string;
  theme: string;
  created_at: number | string | Date;
  updated_at: number | string | Date;
};

export type Folder = {
  _id: string;
  uid: string;
  email: string;
  folder_name: string;
  folder_description: string;
  code_blocks: string[];
  created_at: number | string | Date;
  updated_at: number | string | Date;
};

export type CodeFolderWithBlocks = Omit<Folder, 'code_blocks'> & {
  code_blocks: Block[];
};

export type ClientCodeFolderPostType = Omit<
  Folder,
  '_id' | 'created_at' | 'updated_at'
>;
