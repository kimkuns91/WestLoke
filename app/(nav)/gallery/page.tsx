import Image from "next/image";
import { cn } from "@/lib/utils";

export default function GalleryPage() {
  return (
    <div className="w-full bg-[#F3EEEA]">
      <div className="mx-auto w-full max-w-[1000px] border-t border-black/5 py-24">
        <div
          className={cn(
            "w-full px-6 py-5",
            "flex items-center justify-between",
            "bg-black text-white"
          )}
        >
          <h2 className="text-4xl">Ryle Lee and Junu Live at Seoul</h2>
          <p className="text-base">2023.11.13</p>
        </div>
        <video width={1000} height={500} controls={true}>
          <source
            src="https://rr3---sn-npoe7nez.c.drive.google.com/videoplayback?expire=1712655417&ei=CeIUZqzfEsu_mvUP_LCQyAI&ip=118.131.38.235&id=9e19f650530238f3&itag=37&source=webdrive&requiressl=yes&xpc=EghonaK1InoBAQ==&mh=M8&mm=32,26&mn=sn-npoe7nez,sn-un57snee&ms=su,onr&mv=u&mvi=3&pl=22&ttl=transient&susc=dr&driveid=1z1TdI-LhhKLXZjSOhzOCcK4S9HAFElFr&app=explorer&eaua=CLKd9JPh6E4&mime=video/mp4&vprv=1&prv=1&dur=158.081&lmt=1689569833997815&mt=1712644167&fvip=4&subapp=DRIVE_WEB_FILE_VIEWER&txp=0001224&sparams=expire,ei,ip,id,itag,source,requiressl,xpc,ttl,susc,driveid,app,eaua,mime,vprv,prv,dur,lmt&sig=AJfQdSswRQIgRa2iyOC0GnoxMRD7EDgxgWSVQgF_F8sT9eOsky2R8_0CIQDZ1ekeuEHmvqSUxdOO8B5kbD-TIBO1G3KHhACzWRgT5w==&lsparams=mh,mm,mn,ms,mv,mvi,pl&lsig=ALClDIEwRQIgEv_Wq1shHBnAGYTd_va2Qtt-dTiH5fpwAwlWvzbUFs0CIQDcj_pDCUDmBt_bDp_rxdpLf9gAl-gzvWAPn_z-iA_1uQ==&cpn=RmUm9wKbusM88Vjn&c=WEB_EMBEDDED_PLAYER&cver=1.20240402.01.00"
            type="video/mp4"
          />
        </video>
        <Image
          className="mt-32 h-[500px] w-full object-cover"
          src="/images/SeoulBG.png"
          alt="SeoulBG"
          width={1000}
          height={500}
        />
        <div
          className={cn(
            "w-full px-6 py-5",
            "flex items-center gap-4",
            "bg-[#222222] text-white"
          )}
        >
          <h2 className="text-4xl font-semibold">Seoul Session</h2>
          <p className="text-base">by Ryle Lee and Junu</p>
        </div>
      </div>
    </div>
  );
}
