"use client";

import { FiInstagram, FiMail } from "react-icons/fi";
import { FormEvent, useEffect, useState } from "react";
import {
  getSubscriptionStatus,
  subscribe,
  unsubscribe,
} from "@/actions/subscribe";
import { westlokeamps, westlokemusicEmail } from "@/constants/sns";

import Link from "next/link";
import { Spinner } from "@nextui-org/react";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";

const StayTuned = () => {
  const { status } = useSession();
  const t = useTranslations("StayTuned");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loadingType, setLoadingType] = useState<
    "subscribe" | "unsubscribe" | null
  >(null);

  useEffect(() => {
    const fetchSubscriptionStatus = async () => {
      if (status === "authenticated") {
        const { isSubscribed } = await getSubscriptionStatus();
        setIsSubscribed(isSubscribed);
      }
    };

    fetchSubscriptionStatus();
  }, [status]);

  const handleSubscribe = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (status === "authenticated") {
        if (isSubscribed) {
          setLoadingType("unsubscribe");
          await unsubscribe();
          setIsSubscribed(false);
          toast.success(t("unsubscribeSuccess"), { duration: 3000 });
        } else {
          setLoadingType("subscribe");
          await subscribe();
          setIsSubscribed(true);
          toast.success(t("subscribeSuccess"), { duration: 3000 });
        }
      } else {
        setLoadingType("subscribe");
        await subscribe({ email });
        toast.success(t("subscribeSuccess"), { duration: 3000 });
        setEmail("");
      }
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case "Already subscribed":
            toast.error(t("alreadySubscribed"), { duration: 3000 });
            break;
          case "Invalid email format":
            toast.error(t("invalidEmail"), { duration: 3000 });
            break;
          case "Email is required":
            toast.error(t("emailRequired"), { duration: 3000 });
            break;
          default:
            toast.error(t("subscribeError"), { duration: 3000 });
        }
      }
    } finally {
      setLoading(false);
      setLoadingType(null);
    }
  };

  const getButtonText = () => {
    if (loading) {
      if (loadingType === "subscribe") return t("subscribing");
      if (loadingType === "unsubscribe") return t("unsubscribing");
      return t("loading");
    }

    if (status === "authenticated") {
      return isSubscribed ? t("unsubscribe") : t("subscribe");
    }

    return t("subscribe");
  };

  return (
    <div className="bg-[#F3EEEA]">
      <div
        className={cn(
          "mx-auto w-full px-4 py-8 md:w-[660px] md:px-0 md:py-12",
          "flex flex-col items-center justify-center"
        )}
      >
        <h2 className="text-center text-2xl font-semibold md:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-2 text-center text-sm font-medium md:text-base">
          {t("description")}
        </p>
        <form
          onSubmit={handleSubscribe}
          className="mt-6 flex w-full flex-col gap-3 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-2"
        >
          {status !== "authenticated" && (
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              className="h-10 flex-1 border border-black bg-inherit px-4 md:h-12"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}
          <button
            className={cn(
              "h-10 text-sm text-white transition-all duration-300 ease-in-out md:h-12 md:text-base",
              status === "authenticated" && "w-full",
              isSubscribed
                ? "bg-gray-600 hover:bg-gray-700"
                : "bg-[#B50000] hover:bg-[#FF0000]",
              "px-8 md:px-16",
              loading && "cursor-not-allowed opacity-75"
            )}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" color="white" className="md:size-lg" />
                <span>{getButtonText()}</span>
              </div>
            ) : (
              getButtonText()
            )}
          </button>
        </form>
        <div
          className={cn(
            "mt-10 flex gap-6 md:mt-16 md:gap-8",
            "text-xl md:text-2xl"
          )}
        >
          <Link
            href={westlokeamps}
            className="Menu transition-colors hover:text-gray-600"
          >
            <FiInstagram />
          </Link>
          <Link
            href={westlokemusicEmail}
            className="Menu transition-colors hover:text-gray-600"
          >
            <FiMail />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StayTuned;
