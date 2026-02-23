import Image from "next/image";

export default function Step5Media({
  formData,
  localMedia,
  addMedia,
  removeLocalMedia,
  removeUploadedMedia,
}: any) {
  const uploadedImages = formData?.images || [];
  const localImages = localMedia?.images || [];

  // MERGE both for display
  const allImages = [...uploadedImages, ...localImages];

  const uploadedVideos = formData?.videos || [];
  const localVideos = localMedia?.videos || [];
  const allVideos = [...uploadedVideos, ...localVideos];

  return (
    <div className="space-y-8">
      {/* IMAGES */}
      <div>
        <h3 className="font-semibold mb-2">Images (Required)</h3>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => addMedia("images", Array.from(e.target.files || []))}
        />

        <div className="grid grid-cols-3 gap-3 mt-4">
          {allImages.map((img: any, index: number) => {
            const isLocal = img instanceof File;

            return (
              <div
                key={isLocal ? `local-${index}` : img._id}
                className="relative"
              >
                <Image
                  src={
                    isLocal
                      ? URL.createObjectURL(img)
                      : `https://res.cloudinary.com/dyliae7ie/image/upload/w_400/${img.public_id}`
                  }
                  width={500}
                  height={300}
                  alt="listing"
                  className="rounded-xl object-cover h-32 w-full"
                />
                <div className="flex justify-between mt-4">
                  <div />
                  <button
                  onClick={() =>
                    isLocal
                      ? removeLocalMedia(index, "images")
                      : removeUploadedMedia(img._id, "images")
                  }
                  className="bg-red-500 text-xs px-2 rounded"
                >
                  ✕ Remove
                </button>
                </div>
              </div>
            );
          })}

          {allVideos.map((vid: any, index: number) => {
            const isLocal = vid instanceof File;
            return (
              <div
                key={isLocal ? `local-video-${index}` : vid._id}
                className="flex justify-between"
              >
                <span>{isLocal ? vid.name : vid.public_id}</span>
                <button
                  onClick={() =>
                    isLocal
                      ? removeLocalMedia(index, "videos")
                      : removeUploadedMedia(vid._id, "videos")
                  }
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* VIDEOS */}
      <div>
        <h3 className="font-semibold mb-2">Videos (Optional)</h3>

        <input
          type="file"
          multiple
          accept="video/*"
          onChange={(e) => addMedia("videos", Array.from(e.target.files || []))}
        />

        <div className="space-y-2 mt-4">
          {localVideos.map((file: File, index: number) => (
            <div key={`local-video-${index}`} className="flex justify-between">
              <span>{file.name}</span>
              <button
                onClick={() => removeLocalMedia(index, "videos")}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}

          {uploadedVideos.map((vid: any) => (
            <div key={vid._id} className="flex justify-between">
              <span>{vid.public_id}</span>
              <button
                onClick={() => removeUploadedMedia(vid._id, "videos")}
                className="text-red-500 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
