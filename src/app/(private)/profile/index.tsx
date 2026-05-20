import { ProfileView } from "../../../viewModels/Profile/Profile.view";
import { useProfileViewModel } from "../../../viewModels/Profile/useProfile.viewModel";

export default function Profile() {
  const props = useProfileViewModel();

  return <ProfileView {...props} />;
}
