"use client";
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image';

export function EmblaCarouselMini() {
  // TODO: Make this dynamic, aka connect the carousel to the API.
  const data = [
    {
        "image": "https://cdn.torten.xyz/gradex-testing/468077838_122177097692062381_7890325569239408004_n.jpg",
        "title": "Welcome to GradeX",
        "description": "Grades made easy with GradeX!\nAccess and export grade reports in a snap!."
    },
    {
        "image": "https://cdn.torten.xyz/gradex-testing/420145280_122131124732062381_7660594817907200843_n.jpg",
        "title": "Welcome Back Olivarians!",
        "description": "Few days away from the NEW School Year and we cannot wait to welcome you all at the campus, Olivarians!",
    },
    {
        "image": "https://cdn.torten.xyz/gradex-testing/420145280_122131124732062381_7660594817907200843_n.jpg",
        "title": "Grade Reports are ready to view",
        "description": "Grade reports has been published and is ready to view. Please log-in to see your recent grade report.",
    },
  ]
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay()])

  return (
    <div className="overflow-hidden h-full" ref={emblaRef}>
      <div className="flex h-full">
        {data.map((content, index) => {
            return (
                <div className="flex-[0_0_100%] min-w-0 h-full relative" key={index}>
                    <Image src={content.image} alt={content.title} fill={true} className='object-cover' priority={true} />
                    <div className="absolute bottom-5 left-5 flex flex-col gap-2 text-left text-white">
                        <h1 className="text-2xl font-bold">
                          {content.title}
                        </h1>
                        <p>
                          {content.description}
                        </p>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  )
}
