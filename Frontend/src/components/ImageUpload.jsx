import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, X } from "lucide-react";
const PLACEHOLDER_IMAGES = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800",
];
const ImageUpload = ({ userId, onImagesChange, maxImages = 10 }) => {
    const { toast } = useToast();
    const [images, setImages] = useState([]);
    const [dragActive, setDragActive] = useState(false);
    const handleFiles = (files) => {
        const fileArray = Array.from(files);
        if (images.length + fileArray.length > maxImages) {
            toast({ variant: "destructive", title: "Too many images", description: `Max ${maxImages} images allowed` });
            return;
        }
        const validFiles = fileArray.filter(f => {
            if (!f.type.startsWith("image/")) {
                toast({ variant: "destructive", title: `${f.name} is not an image` });
                return false;
            }
            if (f.size > 5 * 1024 * 1024) {
                toast({ variant: "destructive", title: `${f.name} is too large (max 5MB)` });
                return false;
            }
            return true;
        });
        if (!validFiles.length)
            return;
        // في الـ demo: نستخدم placeholder images
        // TODO: ارفع على السيرفر وخد الـ URL الحقيقي
        const newUrls = validFiles.map((_, i) => PLACEHOLDER_IMAGES[(images.length + i) % PLACEHOLDER_IMAGES.length]);
        const allImages = [...images, ...newUrls];
        setImages(allImages);
        onImagesChange(allImages);
        toast({ title: "Images added!", description: `${validFiles.length} image(s) added (demo mode uses placeholders)` });
    };
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(e.type === "dragenter" || e.type === "dragover");
    }, []);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files?.length)
            handleFiles(e.dataTransfer.files);
    }, [images]);
    const removeImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        onImagesChange(newImages);
    };
    return (<div className="space-y-4">
      <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent"}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop} onClick={() => document.getElementById("image-upload")?.click()}>
        <input id="image-upload" type="file" accept="image/*" multiple className="hidden" onChange={e => e.target.files && handleFiles(e.target.files)} disabled={images.length >= maxImages}/>
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground"/>
        <p className="text-muted-foreground mb-1">Click to upload or drag and drop</p>
        <p className="text-sm text-muted-foreground">Up to {maxImages} images (PNG, JPG, max 5MB)</p>
        <p className="text-xs text-muted-foreground mt-2 opacity-70">Demo mode: placeholder images will be used</p>
      </div>
      {images.length > 0 && (<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, i) => (<div key={i} className="relative group aspect-square">
              <img src={url} alt={`Property image ${i + 1}`} className="w-full h-full object-cover rounded-lg"/>
              <Button type="button" size="icon" variant="destructive" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={e => { e.stopPropagation(); removeImage(i); }}><X className="w-4 h-4"/></Button>
              {i === 0 && <span className="absolute bottom-2 left-2 bg-accent text-accent-foreground text-xs px-2 py-1 rounded">Cover</span>}
            </div>))}
        </div>)}
    </div>);
};
export default ImageUpload;
