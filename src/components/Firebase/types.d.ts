import { Node } from 'slate';

export interface Identifiable {
  readonly id: string;
}
export interface Post {
  readonly title: string;
  readonly content: Node[];
  readonly thumbnailUrl?: string;
  readonly lastModifiedAt?: Date;
}

export interface PostWithId extends Post, Identifiable {}

export interface PostCreateRequest {
  readonly title: string;
  readonly content: any[];
  readonly thumbnailUrl?: string | null;
}

export interface PostDeleteRequest {
  readonly uid: string;
}

export interface PostUpdateRequest extends PostCreateRequest {
  readonly uid: string;
}

export interface RoleAddRequest {
  readonly email: string;
}

export interface RoleRemoveRequest {
  readonly email: string;
}

export interface AdminRoleSetRequest extends RoleAddRequest {
  readonly admin: boolean;
}

export interface MemberRoleSetRequest extends RoleAddRequest {
  readonly member: boolean;
}
