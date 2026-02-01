import { auth } from '@/features/auth/lib/firebase.config';
import { useAuthStore } from '@/features/auth/store/auth.store';
import { ProfilePlaceholderSvg } from '@/shared/assets/Svgs';
import FormatedDate from '@/shared/components/ui/FormatedDate';
import Button from '@/shared/components/ui/Button';
import { updateProfile, type User } from 'firebase/auth';
import { toast } from 'kitzo';
import { CameraIcon, MailIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

export default function Profile() {
  const user = useAuthStore((s) => s.user);

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
  });

  const handleSave = async () => {
    setIsSaving(true);

    try {
      await updateProfile(auth.currentUser as User, {
        displayName: profileData.displayName,
        photoURL: profileData.photoURL,
      });
      setIsSaving(false);
      setIsEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsSaving(false);
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setProfileData({
      displayName: user?.displayName || '',
      email: user?.email || '',
      photoURL: user?.photoURL || '',
    });
    setIsEditing(false);
  };

  return (
    <div className="pt-12 pb-20">
      <div className="">
        {/* Header */}
        <div className="mb-8 pl-2">
          <h1 className="mb-2 text-lg tracking-tight">Profile Settings</h1>
          <p className="leading-relaxed text-neutral-600">
            Manage your account information and preferences
          </p>
        </div>

        {/* Profile Card */}
        <div className="items-start gap-4 max-lg:space-y-6 lg:flex">
          <div className="flex-1 rounded-2xl border border-neutral-200 bg-white p-8">
            {/* Profile Picture Section */}
            <div className="mb-8 flex items-center gap-6">
              <div className="relative">
                <div className="size-24 overflow-hidden rounded-full border-2 border-neutral-200">
                  {profileData.photoURL ? (
                    <img
                      src={profileData.photoURL}
                      alt={profileData.displayName}
                      className="size-full object-cover"
                    />
                  ) : (
                    <div className="grid size-full bg-neutral-100">
                      <ProfilePlaceholderSvg className="size-full text-neutral-600" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h2 className="mb-1 tracking-tight">
                  {user?.displayName || 'User'}
                </h2>
                <p className="text-sm text-neutral-600">{user?.email}</p>
              </div>
              {!isEditing && (
                <Button
                  onClick={() => setIsEditing(true)}
                  primary
                >
                  <span className="px-5 py-2.5">Edit Profile</span>
                </Button>
              )}
            </div>
            {/* Form Fields */}
            <div className="space-y-6">
              {/* Display Name */}
              <div className="grid gap-2">
                <label
                  className="text-sm text-neutral-700"
                  htmlFor="display-name"
                >
                  <div className="flex items-center gap-2">
                    <UserIcon
                      size={16}
                      className="text-neutral-600"
                    />
                    <span>Display Name</span>
                  </div>
                </label>
                <input
                  id="display-name"
                  type="text"
                  placeholder="Enter your name"
                  value={profileData.displayName}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      displayName: e.target.value,
                    }))
                  }
                  disabled={!isEditing}
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:text-neutral-600"
                />
              </div>
              {/* Email */}
              <div className="grid gap-2">
                <label
                  className="text-sm text-neutral-700"
                  htmlFor="email"
                >
                  <div className="flex items-center gap-2">
                    <MailIcon
                      size={16}
                      className="text-neutral-600"
                    />
                    <span>Email Address</span>
                  </div>
                </label>
                <input
                  id="email"
                  type="email"
                  value={profileData.email}
                  disabled
                  className="cursor-not-allowed rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-neutral-600 outline-none"
                />
                <p className="text-xs text-neutral-500">
                  Email cannot be changed. Contact support if you need to update
                  it.
                </p>
              </div>
              {/* Photo URL (Optional) */}
              {isEditing && (
                <div className="grid gap-2">
                  <label
                    className="text-sm text-neutral-700"
                    htmlFor="photo-url"
                  >
                    <div className="flex items-center gap-2">
                      <CameraIcon
                        size={16}
                        className="text-neutral-600"
                      />
                      <span>Photo URL (Optional)</span>
                    </div>
                  </label>
                  <input
                    id="photo-url"
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={profileData.photoURL}
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        photoURL: e.target.value,
                      }))
                    }
                    className="rounded-xl border border-neutral-200 bg-white px-4 py-3 transition-colors outline-none focus:border-neutral-400"
                  />
                </div>
              )}
            </div>
            {/* Action Buttons */}
            {isEditing && (
              <div className="mt-8 flex justify-end gap-2 border-t border-neutral-200 pt-6">
                <Button onClick={handleCancel}>
                  <span className="grid h-9 place-items-center px-5">
                    Cancel
                  </span>
                </Button>
                <Button
                  onClick={handleSave}
                  primary
                >
                  <span className="grid h-9 min-w-24 place-items-center px-5">
                    {isSaving ? (
                      <span className="loading loading-spinner loading-xs opacity-80"></span>
                    ) : (
                      <span>Save Changes</span>
                    )}
                  </span>
                </Button>
              </div>
            )}
          </div>
          {/* Additional Info Card */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-6">
            <h3 className="mb-4 tracking-tight">Account Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-600">Account Status</span>
                <span className="rounded-lg bg-green-100 px-3 py-1 text-green-700">
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                <span className="text-neutral-600">User ID</span>
                <span className="font-mono text-xs text-neutral-700">
                  {user?.uid}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Account Created</span>
                <span className="text-neutral-700">
                  {user?.metadata?.creationTime ? (
                    <FormatedDate time={user?.metadata?.creationTime} />
                  ) : (
                    'N/A'
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
