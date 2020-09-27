import { Node } from 'slate';

export interface Post {
  readonly title: string;
  readonly content: Node[];
  readonly thumbnailUrl?: string;
}

export interface PostCreateRequest {
  readonly title: string;
  readonly content: any;
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
