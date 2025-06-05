export type PostsResponse =
  | {
      data: Data
      success: true
    }
  | {
      error: string
      success: false
    }

export interface Data {
  posts: Post[]
}

export interface Post {
  comments: Comment[]
  content: string
  dateCreated: string
  id: number
  memberId: number
  memberPostedBy: MemberPostedBy
  postType: string
  title: string
  votes: Vote[]
}

export interface Comment {
  id: number
  memberId: number
  parentCommentId: null
  postId: number
  text: string
}

export interface MemberPostedBy {
  id: number
  user: User
  userId: number
}

export interface User {
  email: string
  firstName: string
  id: number
  lastName: string
  password: string
  username: string
}

export interface Vote {
  id: number
  memberId: number
  postId: number
  voteType: 'Upvote' | 'Downvote'
}
