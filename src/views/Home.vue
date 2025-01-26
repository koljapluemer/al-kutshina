<template>
    <nav class="flex flex-col gap-4 items-center max-w-sm m-auto my-8">
        <router-link class="btn" :to="{ name: 'direct-play', params: { language: 'ar' } }">
            <div class="rounded-full p-1 bg-green-600 text-white font-bold">ظ</div>
            Learn Standard Arabic
        </router-link>

        <router-link class="btn" :to="{ name: 'direct-play', params: { language: 'de' } }">
            🇩🇪 Learn German
        </router-link>

        <router-link class="btn" :to="{ name: 'direct-play', params: { language: 'es' } }">
            🇪🇸 Learn Spanish
        </router-link>
    </nav>

</template>