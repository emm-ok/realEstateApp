import Image from "next/image";

export default function Step5Review({ formData, goToStep }: any) {
  if (!formData) return null;

  const {
    title,
    description,
    price,
    currency,
    listingType,
    rentalFrequency,
    type,
    bedrooms,
    bathrooms,
    areaSize,
    areaUnit,
    location,
    images,
    videos,
  } = formData;

  return (
    <div className="grid grid-cols-2 gap-4 space-y-6 overflow-y-auto max-h-[70vh] p-2 sm:p-4">
      {/* BASIC INFO */}
      <Section title="Basic Information" onEdit={() => goToStep(1)}>
        <Item label="Title" value={title} />
        <Item label="Description" value={description} />
      </Section>

      {/* PRICING */}
      <Section title="Pricing & Classification" onEdit={() => goToStep(2)}>
        <Item label="Price" value={`${currency || "$"} ${price}`} />
        <Item label="Listing Type" value={listingType} />
        {listingType === "for_rent" && (
          <Item label="Rental Frequency" value={rentalFrequency} />
        )}
        <Item label="Property Type" value={type} />
      </Section>

      {/* DETAILS */}
      <Section title="Property Details" onEdit={() => goToStep(3)}>
        <Item label="Bedrooms" value={bedrooms} />
        <Item label="Bathrooms" value={bathrooms} />
        <Item label="Area" value={`${areaSize} ${areaUnit}`} />
      </Section>

      {/* LOCATION */}
      <Section title="Location" onEdit={() => goToStep(4)}>
        <Item label="Address" value={location?.address} />
        <Item label="City" value={location?.city} />
        <Item label="State" value={location?.state} />
        <Item label="Country" value={location?.country} />
      </Section>

      {/* MEDIA */}
      <Section title="Media" onEdit={() => goToStep(5)}>
        {/* Images */}
        <div>
          <h4 className="font-medium mb-2">Images</h4>
          {images?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {images.map((img: any) => (
                <Image
                  key={img._id}
                  src={`https://res.cloudinary.com/dyliae7ie/image/upload/w_300/${img.public_id}`}
                  width={500}
                  height={300}
                  alt="listing"
                  className="rounded shadow object-cover w-full h-32 sm:h-36 md:h-40"
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No images uploaded</p>
          )}
        </div>

        {/* Videos */}
        {videos?.length > 0 && (
          <div className="mt-4">
            <h4 className="font-medium mb-2">Videos</h4>
            <div className="space-y-2 overflow-x-auto">
              {videos.map((vid: any) => (
                <p key={vid._id} className="text-sm text-gray-600 truncate">
                  {vid.public_id}
                </p>
              ))}
            </div>
          </div>
        )}
      </Section>
    </div>
  );
}

// --- Section Component ---
function Section({ title, children, onEdit }: any) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <button
          onClick={onEdit}
          className="text-sm text-blue-600 hover:underline"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

// --- Item Component ---
function Item({ label, value }: any) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-right">{value || "—"}</span>
    </div>
  );
}