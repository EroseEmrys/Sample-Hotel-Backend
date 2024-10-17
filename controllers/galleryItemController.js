import GalleryItem from "../models/galleryItem.js";

export function createGalleryItem(req, res) {
  const user =req.user
  if (!user) {
    return res.status(401).json({ message: "Please Login First" });
  }
  if(user.type != "admin"){
    return res.status(403).json({ message: "Only Admin can add Gallery Items" });
  }
  const galleryItem = req.body.item;
  const newGalleryItem = new GalleryItem(galleryItem);
  newGalleryItem
    .save()
    .then(() => {
      res.json({
        message: "Gallery Item added successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Failed to add Gallery Item",
      });
    });
}

export function getGalleryItems(req,res){
    GalleryItem.find()
   .then((list)=>{
    res.json({
        list:list
    });
   })
}