import React from "react";

import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";
import { Card, CardContent } from "@/components/ui/card"
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
      const newImage = result.info.secure_url;
      const arrayNum = value.push(newImage);
      console.log(arrayNum);
      console.log(value);
      onChange(value);
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
          <div>
            {value.length > 0 ? (
                <div className="
                    flex
                    justify-center
                    pb-4
                ">
                <Carousel 
                    className="
                        w-full 
                        aspect-square
                        max-w-xs
                        flex
                        justify-center
                        items-center
                    "
                > {/* Carousel not working */}
                  <CarouselContent
                    className="
                        h-full
                        w-full
                        aspect-square
                    "
                  >
                    {value.map((src, index) => (
                      <CarouselItem
                        key={index}
                        className="
                            lg:basis-1/2
                            min-w-[320px]
                            ml-[10px]"
                      >
                        <div className="p-1 h-full w-full">
                            <Card
                                className="
                                    w-full
                                    h-full
                                "
                            >
                                <CardContent 
                                    className="
                                        w-full
                                        h-full
                                        relative
                                        !aspect-square
                                    ">
                                            <Image 
                                                style={{objectFit: "cover"}}
                                                src={src} 
                                                fill
                                                alt="Uploaded Image" 
                                            />
                                </CardContent>
                            </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
                </div>
            ) : (
              <div
                onClick={() => open?.()}
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
