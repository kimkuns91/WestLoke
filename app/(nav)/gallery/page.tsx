import Image from "next/image";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Gallery | Westloke Amps",
  description: "Watch our latest performances and gallery",
};

export default function GalleryPage() {
  return (
    <div className="w-full bg-[#F3EEEA]">
      <div className="mx-auto w-full max-w-[1000px] border-t border-black/5 px-4 py-12 md:px-0 md:py-24">
        {/* 비디오 섹션 */}
        <div className="mb-8 md:mb-0">
          {/* 비디오 타이틀 */}
          <div
            className={cn(
              "w-full px-4 py-4 md:px-6 md:py-5",
              "flex flex-col gap-2 md:flex-row md:items-center md:justify-between",
              "bg-black text-white"
            )}
          >
            <h2 className="text-xl font-semibold md:text-4xl">
              Ryle Lee and Junu Live at Seoul
            </h2>
            <p className="text-sm md:text-base">2023.11.13</p>
          </div>

          {/* 비디오 플레이어 */}
          <div className="relative aspect-video w-full overflow-hidden">
            <video
              controls
              className="h-full w-full"
              poster="/images/video-thumbnail.jpg"
            >
              <source
                src="https://rr3---sn-npoe7nez.c.drive.google.com/videoplayback?expire=1712655417&ei=CeIUZqzfEsu_mvUP_LCQyAI&ip=118.131.38.235&id=9e19f650530238f3&itag=37&source=webdrive&requiressl=yes&xpc=EghonaK1InoBAQ==&mh=M8&mm=32,26&mn=sn-npoe7nez,sn-un57snee&ms=su,onr&mv=u&mvi=3&pl=22&ttl=transient&susc=dr&driveid=1z1TdI-LhhKLXZjSOhzOCcK4S9HAFElFr&app=explorer&eaua=CLKd9JPh6E4&mime=video/mp4&vprv=1&prv=1&dur=158.081&lmt=1689569833997815&mt=1712644167&fvip=4&subapp=DRIVE_WEB_FILE_VIEWER&txp=0001224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,eaua,mime,vprv,prv,dur,lmt&sig=AJfQdSswRQIgRa2iyOC0GnoxMRD7EDgxgWSVQgF_F8sT9eOsky2R8_0CIQDZ1ekeuEHmvqSUxdOO8B5kbD-TIBO1G3KHhACzWRgT5w==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=ALClDIEwRQIgEv_Wq1shHBnAGYTd_va2Qtt-dTiH5fpwAwlWvzbUFs0CIQDcj_pDCUDmBt_bDp_rxdpLf9gAl-gzvWAPn_z-iA_1uQ==&cpn=RmUm9wKbusM88Vjn&c=WEB_EMBEDDED_PLAYER&cver=1.20240402.01.00"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* 이미지 섹션 */}
        <div className="mt-16 md:mt-32">
          <Image
            className="h-[300px] w-full object-cover md:h-[500px]"
            src="/images/SeoulBG.png"
            alt="Seoul Session Background"
            width={1000}
            height={500}
            priority
          />
          <div
            className={cn(
              "w-full px-4 py-4 md:px-6 md:py-5",
              "flex flex-col gap-2 md:flex-row md:items-center md:gap-4",
              "bg-[#222222] text-white"
            )}
          >
            <h2 className="text-2xl font-semibold md:text-4xl">
              Seoul Session
            </h2>
            <p className="text-sm md:text-base">by Ryle Lee and Junu</p>
          </div>
        </div>
      </div>
    </div>
  );
}
