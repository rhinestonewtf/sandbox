'use client'

import { useState, useEffect } from 'react'

export function Carousel({
  autoSlide = false,
  autoSlideInterval = 3000,
  slides,
}: {
  autoSlide?: boolean
  autoSlideInterval?: number
  slides: {
    title: string
    description: string
    label?: string
    subLabel?: string
    imageUrl: string
    ctaText: string
    onCtaClick: (index: number) => void
  }[]
}) {
  const [curr, setCurr] = useState(0)

  const prev = () =>
    setCurr((curr) => (curr === 0 ? slides.length - 1 : curr - 1))
  const next = () =>
    setCurr((curr) => (curr === slides.length - 1 ? 0 : curr + 1))

  useEffect(() => {
    if (!autoSlide) return
    const slideInterval = setInterval(next, autoSlideInterval)
    return () => clearInterval(slideInterval)
  }, [])

  return (
    <div className="relative">
      <div className="">
        <div className="overflow-hidden relative">
          <div
            className="flex transition-transform ease-out duration-500"
            style={{ transform: `translateX(-${curr * 100}%)` }}
          >
            {slides.map((slide, i) => (
              <div className="carousel-item relative w-full" key={i}>
                <div className="flex w-full flex-col">
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={slide.imageUrl}
                      className="w-full h-[360px] object-cover rounded-[20px]"
                    />
                    <div className="absolute left-2 text-white bottom-24">
                      <p className="text-heading-2">{slide.label}</p>
                      <p className="text-paragraph">{slide.subLabel}</p>
                    </div>

                    <div
                      className="flex absolute bottom-0 bg-white bg-opacity-80 backdrop-blur-[80px] mb-2 rounded-2xl p-3"
                      style={{ width: '98%' }}
                    >
                      <div className="flex flex-1 gap-3">
                        <div>
                          <img
                            src={slide.imageUrl}
                            className="w-12 h-12 rounded-lg"
                          />
                        </div>
                        <div>
                          <div className="text-paragraph-accent">
                            {slide.title}
                          </div>
                          <div className="text-paragraph text-gray-400">
                            {slide.description}
                          </div>
                        </div>
                      </div>
                      <button
                        className="btn regular-primary self-end border-none"
                        onClick={() => slide.onCtaClick(i)}
                      >
                        {slide.ctaText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="absolute top-1 right-0 left-0 z-10">
            <div className="flex items-center justify-center gap-2 m-2 mx-4">
              {slides.map((_, i) => (
                <div
                  key={i}
                  onClick={() => setCurr(i)}
                  className={`
              transition-all w-full h-1 bg-white hover:cursor-pointer
              ${curr !== i && 'bg-opacity-50'}
              
            `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
