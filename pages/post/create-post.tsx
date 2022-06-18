import CreatePost from "../../src/components/Posts/CreatePost";
import { UserProfile, withPageAuthRequired } from "@auth0/nextjs-auth0";

type ProfileProps = { user: UserProfile };

const CreatePostPage = ({ user }: ProfileProps) => {
    return <CreatePost />;
};

export const getServerSideProps = withPageAuthRequired();

export default CreatePostPage;
