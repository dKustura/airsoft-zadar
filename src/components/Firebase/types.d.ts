import { Node } from 'slate';
import { User } from 'firebase';

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

export interface CustomClaims {
  [key: string]: boolean;
}

export interface GetUserResult extends User {
  readonly customClaims?: CustomClaims;
}

export interface GetUsersResult {
  readonly users: GetUserResult[];
}

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
