const CoachIntroduction = () => {
    return (
        <section className="py-16 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
            <h1 className="text-5xl text-center mb-3 font-bold text-sky-600 fade-in-up">
                কোচ পরিচিতি
            </h1>
            <div className="max-w-7xl mx-auto rounded-3xl fade-in-up delay-200">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover-lift">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image Section */}
                        <div className="relative fade-in-left delay-300">
                            <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                                <img
                                    src="/jahidhasanmilu.jpg"
                                    alt="জাহিদ হাসান মিলু"
                                    className="w-full h-full object-cover object-top"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                                <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-700 hidden items-center justify-center text-white text-6xl font-bold">
                                    জাহিদ হাসান মিলু
                                </div>
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="px-0 py-8 lg:px-0 lg:py-12 flex flex-col justify-center">
                            <div className="space-y-6">
                                {/* Header */}
                                <div className="text-center">
                                    <h2 className="font-anek text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                                        জাহিদ হাসান মিলু
                                    </h2>
                                </div>

                                {/* Description */}
                                <div className="space-y-4 lg:px-4 text-gray-700 leading-relaxed text-center lg:text-justify">
                                    <p className="font-anek text-[19px]">
                                        জাহিদ হাসান মিলু একজন আত্ম-উন্নয়নমূলক লেখক ও প্রোফেটিক প্রোডাক্টিভিটি কোচ। ধর্মীয় প্র্যাক্টিসের মাধ্যমে কীভাবে মানুষের ব্যক্তিগত, সামাজিক ও পেশাদার জীবন সুন্দর ও সমৃদ্ধ হয় – সেই মিশনে দীর্ঘদিন ধরে কাজ করে যাচ্ছেন তিনি।
                                        পেশাদার জীবনে তিনি ডিভাইন কনসালটেন্সির প্রতিষ্ঠাতা ও প্রধান নির্বাহী।
                                    </p>

                                    <p className="font-anek text-[19px]">
                                        ইসলামি শিক্ষা গ্রহণ করার পাশাপাশি তিনি অধ্যয়ন করেছেন ঢাকা বিশ্ববিদ্যালয়ের গণযোগাযোগ ও সাংবাদিকতা বিভাগে। এর আগে আল কুরআন হিফজ সম্পন্ন করার পরবর্তীতে তিনি উচ্চতর শিক্ষা দাওরায়ে হাদিসও সম্পন্ন করেন কওমি মাদ্রাসা থেকে।
                                    </p>

                                    <p className="font-anek text-[19px]">
                                        এ পর্যন্ত তার তিনটি গ্রন্থ প্রকাশিত হয়েছে। সেগুলোর মধ্যে উল্লেখযোগ্য হলো বাংলা ভাষায় প্রথম আল কুরআনের পূর্ণাঙ্গ আক্ষরিক অনুবাদ 'প্রজ্ঞাময় কুরআন'।
                                    </p>

                                    <p className="font-anek text-[19px]">
                                        সামাজিক যোগাযোগ মাধ্যমে তার ভিডিওগুলো নিয়মিত লক্ষাধিক মানুষের কাছে পৌঁছে থাকে। বিশেষত তার প্রোফেটিক প্রোডাক্টিভিটি ও ধর্মীয় দৃষ্টিকোণ থেকে আত্ম-উন্নয়নমূলক আলোচনার ভিডিওগুলো দর্শক মহলে ব্যাপক সাড়া ফেলে।
                                    </p>

                                    <p className="font-anek text-[19px]">
                                        একজন পাবলিক স্পিকার হিসেবে তিনি সাধারণত ধর্মীয় ও আত্ম-উন্নয়নমূলক বিভিন্ন বিষয়ে বক্তব্য রেখে থাকেন নিয়মিত।
                                    </p>
                                </div>

                                {/* Achievements Section */}
                                <div className="pt-8 mx-2 fade-in-up delay-500">
                                    <div className="grid grid-cols-3 gap-2 sm:gap-4 poppins">
                                        <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl lg:rounded-2xl text-white shadow-lg smooth-bounce scale-in delay-100">
                                            <div className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">250K+</div>
                                            <div className="font-anek text-xs sm:text-sm lg:text-base font-medium">Social Media Followers</div>
                                        </div>

                                        <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl lg:rounded-2xl text-white shadow-lg smooth-bounce scale-in delay-200">
                                            <div className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">3</div>
                                            <div className="font-anek text-xs sm:text-sm lg:text-base font-medium">Published Books</div>
                                        </div>

                                        <div className="text-center p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-sky-400 to-blue-500 rounded-xl lg:rounded-2xl text-white shadow-lg smooth-bounce scale-in delay-300">
                                            <div className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-1 sm:mb-2">1,000+</div>
                                            <div className="font-anek text-xs sm:text-sm lg:text-base font-medium">Educational Contents</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CoachIntroduction;