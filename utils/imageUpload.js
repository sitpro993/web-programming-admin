export const imageUpload = async (variant, category) => {
  let newVariant = [];
  for (const item of variant) {
    if (!item.public_id) {
      const formData = new FormData();
      formData.append("file", item.img);
      formData.append("upload_preset", category.title);
      formData.append("cloud_name", process.env.CLOUD_NAME);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/beeyou/image/upload",
        {
          method: "POST",
          mode: "cors",
          body: formData,
        }
      );

      const data = await res.json();
      newVariant.push({
        public_id: data.public_id,
        img: data.secure_url,
        title: item.title,
      });
    } else {
      newVariant.push(item);
    }
  }
  return newVariant;
};
