import Link from "next/link";

export default function Carousel () {
return(

<div className="">
<div id="default-carousel" className="relative w-full" data-carousel="slide">
    {/* Carousel wrapper */}
    <div className="relative h-56 overflow-hidden rounded-base md:h-96">
        {/* Item 1 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://media.istockphoto.com/id/1344574623/tr/foto%C4%9Fraf/aesthetic-medicine-doctor-trichologist-outlines-the-area-of-baldness-on-the-clients-head.jpg?s=2048x2048&w=is&k=20&c=6o63VPgS3K4HvVLT6YTez38QbfcJeUaoreG_9Cf91Xk=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
        </div>
        {/* Item 2 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://media.istockphoto.com/id/1344574623/tr/foto%C4%9Fraf/aesthetic-medicine-doctor-trichologist-outlines-the-area-of-baldness-on-the-clients-head.jpg?s=2048x2048&w=is&k=20&c=6o63VPgS3K4HvVLT6YTez38QbfcJeUaoreG_9Cf91Xk=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
        </div>
        {/* Item 3 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://media.istockphoto.com/id/1344574623/tr/foto%C4%9Fraf/aesthetic-medicine-doctor-trichologist-outlines-the-area-of-baldness-on-the-clients-head.jpg?s=2048x2048&w=is&k=20&c=6o63VPgS3K4HvVLT6YTez38QbfcJeUaoreG_9Cf91Xk=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
        </div>
        {/* Item 4 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://media.istockphoto.com/id/1344574623/tr/foto%C4%9Fraf/aesthetic-medicine-doctor-trichologist-outlines-the-area-of-baldness-on-the-clients-head.jpg?s=2048x2048&w=is&k=20&c=6o63VPgS3K4HvVLT6YTez38QbfcJeUaoreG_9Cf91Xk=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
        </div>
        {/* Item 5 */}
        <div className="hidden duration-700 ease-in-out" data-carousel-item>
            <img src="https://media.istockphoto.com/id/1344574623/tr/foto%C4%9Fraf/aesthetic-medicine-doctor-trichologist-outlines-the-area-of-baldness-on-the-clients-head.jpg?s=2048x2048&w=is&k=20&c=6o63VPgS3K4HvVLT6YTez38QbfcJeUaoreG_9Cf91Xk=" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
        </div>
    </div>

    {/* Slider indicators */}
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
        <button type="button" className="w-3 h-3 rounded-base" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
        <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
        <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
        <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
        <button type="button" className="w-3 h-3 rounded-base" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    </div>

    {/* Slider controls */}
    <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m15 19-7-7 7-7"/>
            </svg>
            <span className="sr-only">Previous</span>
        </span>
    </button>
    
    <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-base bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
            <svg className="w-5 h-5 text-white rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m9 5 7 7-7 7"/>
            </svg>
            <span className="sr-only">Next</span>
        </span>
    </button>
</div>
</div>
)
};