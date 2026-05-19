interface UserAvatarProps {
  avatar?: string | null;
  name?: string | null;
  size?: "sm" | "md" | "lg";
}

const sizeClass = {
  sm: "w-7 h-7 text-xs",
  md: "w-8 h-8 text-xs",
  lg: "w-20 h-20 text-3xl",
};

const UserAvatar = ({ avatar, name, size = "md" }: UserAvatarProps) => {
  const cls = `${sizeClass[size]} rounded-full object-cover flex-shrink-0`;

  if (avatar) {
    return <img src={avatar} alt={name ?? "avatar"} className={cls + " object-cover"} />;
  }

  return (
    <div className={`${cls} bg-[#f472b6] flex items-center justify-center text-white font-bold`}>
      {name?.[0]?.toUpperCase() ?? "?"}
    </div>
  );
};

export default UserAvatar;
