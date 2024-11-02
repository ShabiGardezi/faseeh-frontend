import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    username: "علياء ج.",
    comment:
      "أوصي بشدة بخدمات فصيح بسبب أخلاقيات العمل والخدمات المتميزة. الفريق مهذب للغاية ويتمتع بمعرفة واسعة.",
  },
  {
    username: "سامي ل.",
    comment:
      "لقد كنت أستخدم خدمات فصيح منذ عام الآن. أنا معجب جدًا بجودة العمل واحترافية الفريق.",
  },
  {
    username: "جمانة ل.",
    comment:
      "خدمات فصيح هي الأفضل في تقديم خدمات اللغة العربية. أنا متحمسة جدًا بالنتائج التي حصلت عليها.",
  },
  {
    username: "أحمد ب.",
    comment: "تجربة رائعة بشكل عام. سأعود بالتأكيد مرة أخرى.",
  },
];

export function TestimonialCarousel() {
  return (
    <div className="w-full h-full px-6 md:px-0">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="flex"
      >
        <CarouselContent className="flex space-x-2">
          {testimonials.map((testimonial, index) => (
            <CarouselItem
              key={index}
              className="flex-none w-full md:w-1/3 cursor-grab select-none "
            >
              <div className="p-4 h-full">
                <Card className="bg-[#20b1c9] text-white rounded-3xl h-full flex flex-col">
                  <CardContent className="flex flex-col items-center justify-center p-6 py-12 flex-1 ">
                    <p className="text-lg italic mb-4 text-center">
                      {testimonial.comment}
                    </p>
                    <span className="text-xl font-semibold">
                      - {testimonial.username}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="bg-[#20b1c9] text-white border-0 hover:bg-black/70 hover:text-white" />
        <CarouselNext className="bg-[#20b1c9] text-white border-0 hover:bg-black/70 hover:text-white" />
      </Carousel>
    </div>
  );
}
