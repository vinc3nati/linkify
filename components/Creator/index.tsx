"use client";
import Button from "@/components/Button";
import ModalWrapper from "@/components/ModalWrapper";
import { ToastMessage } from "@/components/Toast/page";
import { useAuthStore } from "@/stores/authStore";
import { IMAGE_SIZE_LIMIT, JWT_CREDS, ToastType } from "@/utils/constants";
import supabase from "@/utils/supabaseClient";
import Link from "next/link";
import { ChangeEvent, FormEvent, useMemo, useState, useEffect } from "react";
import { TypeOptions } from "react-toastify";
import { FiEdit2, FiLogOut, FiSave, FiTrash } from "react-icons/fi";
import { BsUpload } from "react-icons/bs";
import ImageUploading, { ImageListType } from "react-images-uploading";
import Image from "next/image";
import NoLinks from "./NoLinks";
import { removeCookie } from "@/utils/cookies";
import Footer from "./Footer";

export type TLink = {
  id?: number;
  created_at?: string;
  title: string;
  url: string;
  user_id?: string;
};

type TUserDetails = {
  id: string;
  profile_picture_url: string;
  fullname: string;
  username: string;
  links: TLink[];
};

type TCreator = {
  userDetaislData: TUserDetails;
};

function Creator(props: TCreator) {
  const initialValue = {
    title: "",
    url: "",
  };
  const initialUserDetails = {
    id: "",
    profile_picture_url: "",
    fullname: "",
    username: "",
    links: [],
  };
  const [linkToBeAdded, setLinkToBeAdded] = useState<TLink>(initialValue);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState<TUserDetails>(
    props.userDetaislData ?? initialUserDetails
  );
  const [editId, setEditId] = useState(-1);
  const [userImage, setUserImage] = useState<ImageListType>([]);

  const me = useAuthStore((state) => state.me);

  const isLoggedIn = useMemo(() => {
    if (me && me?.id && me?.id === userDetails.id) return true;
    return false;
  }, [me, me?.id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkToBeAdded((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const toggleShowModal = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
    setShowModal((prev) => !prev);
    reset();
  };

  const reset = () => {
    setLinkToBeAdded(() => initialValue);
    setShowModal(false);
    setEditId(-1);
  };

  const handleOpenEditModal = (item: TLink) => {
    setEditId(item.id ?? -1);
    setShowModal(true);
    setLinkToBeAdded(item);
  };

  const handleImageChange = (imageList: ImageListType) => {
    if ((imageList[0].file?.size ?? 0) > IMAGE_SIZE_LIMIT) {
      ToastMessage({
        message: "Image size must be less than 50KB",
        type: ToastType.Error as TypeOptions,
      });
      return;
    }
    setUserImage(imageList);
  };

  const addNewLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (linkToBeAdded.title && linkToBeAdded.url && me?.id) {
        console.log("here........", me);
        const { data, error } = await supabase
          .from("links")
          .insert({
            ...linkToBeAdded,
            user_id: me?.id,
            username: me?.username,
          })
          .select();
        if (error) throw error;
        setUserDetails((prev) => ({
          ...prev,
          links: prev.links.concat(data[0]),
        }));
        reset();
        ToastMessage({
          message: "Link has been added",
          type: ToastType.Success as TypeOptions,
        });
      }
    } catch (err: any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.log(">>>>> LinkAddFailure: Failed to add link", err);
    } finally {
      setLoading(false);
    }
  };
  const editLink = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (linkToBeAdded.title && linkToBeAdded.url && me?.id) {
        const { data, error } = await supabase
          .from("links")
          .upsert(linkToBeAdded)
          .select();
        if (error) throw error;
        setUserDetails((prev) => ({
          ...prev,
          links: prev.links.map((item) =>
            item.id === linkToBeAdded.id
              ? { ...item, title: data[0].title, url: data[0].url }
              : item
          ),
        }));
        reset();
        ToastMessage({
          message: "Successfully updated the link",
          type: ToastType.Success as TypeOptions,
        });
      }
    } catch (err: any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.log(">>>>> LinkAddFailure: Failed to edit link", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    try {
      if (userImage.length > 0) {
        const image = userImage[0];
        if (image && isLoggedIn) {
          ToastMessage({
            message: "Upload Started.....",
            type: ToastType.Info as TypeOptions,
          });
          const { data, error } = await supabase.storage
            .from("public")
            .upload(`${me?.id}/${image.file?.name}`, image.file as File, {
              upsert: true,
            });
          if (error) throw error;
          const resp = await supabase.storage
            .from("public")
            .getPublicUrl(data.path);
          const publicURL = resp.data.publicUrl;
          const updateResp = await supabase
            .from("users")
            .update({ profile_picture_url: publicURL })
            .eq("id", me.id);
          if (updateResp.error) throw updateResp.error;
          setUserDetails((prev) => ({
            ...prev,
            profile_picture_url: publicURL,
          }));
          setUserImage([]);
          ToastMessage({
            message: "Image Upload Successfully",
            type: ToastType.Success as TypeOptions,
          });
        }
      }
    } catch (err: any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.log(">>>>> LinkAddFailure: Failed upload photo", err);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      ToastMessage({
        message: "Logged out successfully",
        type: ToastType.Success as TypeOptions,
      });
      localStorage.removeItem(JWT_CREDS.ME);
      removeCookie(JWT_CREDS.ACCESS_TOKEN);
      removeCookie(JWT_CREDS.REFRESH_TOKEN);
      window.location.reload();
    } catch (err: any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.log(">>>>> Failed to log out", err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase.from("links").delete().eq("id", id);

      if (error) throw error;

      ToastMessage({
        message: "Link has been deleted",
        type: ToastType.Success as TypeOptions,
      });
      setUserDetails((prev) => ({
        ...prev,
        links: prev.links.filter((lnk) => lnk.id !== id),
      }));
      reset;
      setShowModal(false);
    } catch (err: any) {
      ToastMessage({
        message: err?.message as string,
        type: ToastType.Error as TypeOptions,
      });
      console.log(">>>>> Failed to delete", err);
    }
  };

  const ImageUploadingComponent = () => {
    return (
      <div className="relative">
        <Image
          src={
            userImage[0]?.["data_url"] ??
            userDetails?.profile_picture_url ??
            `https://robohash.org/${props.userDetaislData.username}`
          }
          height={100}
          width={100}
          alt="profile picture"
          className="rounded-full w-[8rem] h-[8rem] object-center object-cover bg-blue-300 border-2 border-primary/40"
        />
        {isLoggedIn && (
          <ImageUploading
            multiple
            value={userImage}
            onChange={handleImageChange}
            maxNumber={1}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageUpdate,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={() => {
                    if (imageList[0]?.["data_url"]) {
                      onImageUpdate(0);
                    } else {
                      onImageUpload();
                    }
                  }}
                  {...dragProps}
                  className="absolute right-0 bottom-0 bg-primary text-white p-1.5 text-sm rounded-full"
                >
                  <FiEdit2 />
                </button>
              </div>
            )}
          </ImageUploading>
        )}
      </div>
    );
  };

  useEffect(() => {
    function beforeUnload(e: any) {
      if (userImage.length > 0) {
        e.preventDefault();

        // Display a confirmation dialog to the user
        e.returnValue = ""; // This is required for some older browsers
      }
    }
    window.addEventListener("beforeunload", beforeUnload);
    return () => {
      window.removeEventListener("beforeunload", beforeUnload);
    };
  }, [userImage]);

  return (
    <div className="flex w-full h-screen flex-col items-center relative md:pt-6 px-2 pt-2">
      <ImageUploadingComponent />

      <h1 className="text-3xl font-bold text-blue-900 tracking-wider mt-2 mb-4">
        {userDetails?.fullname}
      </h1>
      <div className="flex flex-col gap-4 max-w-lg justify-center items-center w-full mx-auto border-t border-t-primary/40 py-4 mb-6">
        {userDetails?.links?.length > 0 ? (
          userDetails.links.map((link) => (
            <Link
              key={link.id}
              href={link.url}
              target="_blank"
              className="px-3 py-3.5 select-none flex justify-center text-center items-center border w-full rounded-[2rem] bg-[#efefef] text-center relative after:content-[''] after:absolute after:bg-primary after:w-full after:h-full after:inset-0 after:top-2 after:left-2 after:-bottom-2 after:rounded-[inherit] after:-z-10 active:after:top-1 active:after:-bottom-1 active:after:left-1 transition-all after:transition-all"
              title={link.title}
            >
              <span
                className={`${
                  isLoggedIn ? "ml-auto" : "mx-auto"
                }  overflow-hidden text-ellipsis whitespace-nowrap`}
              >
                {link.title}
              </span>
              {isLoggedIn && (
                <span
                  onClick={(e: any) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleOpenEditModal(link);
                  }}
                  className="ml-auto cursor-pointer transition-colors rounded-full hover:bg-slate-300 p-2"
                  title="Edit"
                >
                  <FiEdit2 />
                </span>
              )}
            </Link>
          ))
        ) : (
          <NoLinks isLoggedIn={isLoggedIn} />
        )}
      </div>
      {isLoggedIn && (
        <>
          <div className="fixed bottom-0 flex gap-1 p-2 w-full bg-[#efefef] md:bg-transparent md:gap-2 md:absolute md:top-5 md:right-5 md:w-max md:h-max ">
            {userImage.length > 0 && (
              <Button
                type="button"
                customClasses="bg-[#eee] text-primary w-full border border-primary text-sm rounded-3xl"
                onClick={handleImageUpload}
                title="Upload Image"
              >
                Upload
                <BsUpload />
              </Button>
            )}
            <Button
              type="button"
              onClick={handleLogout}
              customClasses="bg-[#eee] w-full text-primary border border-primary text-sm rounded-3xl"
              title="logout"
            >
              <FiLogOut /> Logout
            </Button>
            <Button
              type="button"
              onClick={handleShowModal}
              customClasses="rounded-3xl w-full text-sm"
              title="Add link"
            >
              Add Link
            </Button>
          </div>
          <ModalWrapper showModal={showModal} toggleShowModal={toggleShowModal}>
            <form
              onSubmit={(e) => {
                if (editId !== -1) editLink(e);
                else addNewLink(e);
              }}
              className="flex flex-col w-full gap-4"
            >
              <header className="font-bold text-xl text-center uppercase pb-1 border-b text-primary ">
                {editId ? "Edit Link" : "Add a Link"}
              </header>
              <input
                type="text"
                name="title"
                placeholder="Awesome link"
                value={linkToBeAdded.title}
                onChange={handleChange}
                required
                className="rounded"
              />
              <input
                type="url"
                name="url"
                placeholder="https://www.google.com"
                value={linkToBeAdded.url}
                onChange={handleChange}
                required
                className="rounded"
              />
              <div className="flex gap-1 flex-1">
                {editId !== -1 && (
                  <Button
                    customClasses="border border-red-600 bg-transparent text-red-600 w-full items-center"
                    type="button"
                    disabled={loading}
                    onClick={() => {
                      handleDelete(editId);
                    }}
                  >
                    <FiTrash /> Delete
                  </Button>
                )}
                <Button
                  type="submit"
                  isLoading={loading}
                  disabled={loading}
                  customClasses="w-full"
                >
                  <FiSave /> {editId !== -1 ? "Save" : "Add"}
                </Button>
              </div>
            </form>
          </ModalWrapper>
        </>
      )}
      <Footer />
    </div>
  );
}

export default Creator;
