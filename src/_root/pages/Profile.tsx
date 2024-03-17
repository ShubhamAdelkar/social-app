import { useUserContext } from "@/context/AuthContext";

const Profile = () => {
  const { user } = useUserContext();
  console.log(user);
  return (
    <div className="explore-container mb-14 lg:mb-0">
      <div className="flex-col flex-between w-full max-w-5xl mt-8 mb-7 lg:mt-14">
        <div className="flex flex-col gap-3 items-center">
          <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile"
            className="rounded-full h-[100px] w-[100px]"
          />
          <div className="flex flex-col items-center">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.username}</p>
          </div>
        </div>
      </div>
      {/* <p className="text-light-3">This is a beta version</p> */}
    </div>
  );
};

export default Profile;
