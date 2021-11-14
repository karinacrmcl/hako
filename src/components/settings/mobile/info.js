import Skeleton from "react-loading-skeleton";
import { useModal } from "../../../context/modal-context";
import useUser from "../../../hooks/use-user";
import SvgSelector from "../svg-selector";

export function MobileSettinsgInfo() {
  const { openModal, setOpenModal } = useModal();
  const {
    user: { fullName, avatarUrl, emailAdress },
  } = useUser();

  return (
    <div className="w-full flex flex-col items-center">
      {avatarUrl ? (
        <img src={avatarUrl?.min} className="w-24 object-cover rounded-full" />
      ) : (
        <Skeleton width={40} height={40} />
      )}

      <p className="text-base font-medium mt-1">{fullName} </p>
      <p className="text-sm font-medium text-gray-base mt-0">{emailAdress}</p>
      <button
        onClick={() => {
          setOpenModal({
            ...openModal,
            ["settingsUserProfileMobile"]: true,
          });
        }}
        className="rounded-full bg-default-first py-1 px-2 text-sm text-white font-medium mt-3 mb-4 flex items-center"
      >
        Edit Profile
        <SvgSelector id="edit-mobile" />
      </button>
    </div>
  );
}
