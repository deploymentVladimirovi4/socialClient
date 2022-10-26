import { SinglePostType } from "../redux/slices/PostSlice";


// instead of sorting and filtering them on server
// trying to get rid of feed array in postSlice, and instead use only allPosts
export const getFeedFromAllPosts = (allPosts: SinglePostType[], friends: string[] | undefined, user: string | undefined) => {
  const myFriendsPosts: SinglePostType[] = [];
    allPosts.map((post) => {
      if (friends?.includes(post.userId)) {
        myFriendsPosts.push(post);
      }
    });
    const myPosts = allPosts.filter((post) => post.userId === user);
    const alotOfPosts = myPosts
      .concat(myFriendsPosts)
      .sort((a: any, b: any) => (b.createdAt > a.createdAt ? 1 : -1));

      return alotOfPosts
}