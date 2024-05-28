import React from "react";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

declare global {
  var cloudinary: any;
}

interface ImageUploadProps {
  onChange: (value: string[]) => void;
  value: string[];
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange([...value, result.info.secure_url]);
    },
    [onChange, value]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="vwzmlhbn"
      options={{
        maxFiles: 10,
      }}
    >
      {({ open }) => {
        return (
          <div onClick={() => open?.()} className="">
            {value.length > 0 ? (
              <div>
                <Carousel> {/* Carousel not working */}
                  <CarouselContent>
                    {value.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="md:basis-1/2 lg:basis-1/3"
                      >
                        <div className="absolute inset-0 w-full h-full">
                          <div>Image {index}</div>
                          <Image src={src} fill={true} alt="Uploaded Image" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </div>
            ) : (
              <div
                className="
                            relative
                            cursor-pointer
                            hover:opacity-70
                            transition
                            border-dashed
                            border-2
                            p-20
                            border-neutral-300
                            flex
                            flex-col
                            justify-center
                            items-center
                            gap-4
                            text-neutral-600
                        "
              >
                <TbPhotoPlus size={50} />
                <div className="font-semibold text-lg">Click to upload</div>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
