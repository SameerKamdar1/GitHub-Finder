let form = document.querySelector("form");
let input = document.querySelector(".searchbar");
let profileContainer = document.querySelector(".profile_card");
let reposContainer = document.querySelector(".repos");
let aboutContainer = document.querySelector(".about");
let languageContainer = document.querySelector("#languages-container");
let RepoContainer = document.querySelector("#repositories-container");

function getUserData(username) {
    let userData = fetch(`https://api.github.com/users/${username}`).then(raw => raw.json());
    return userData;

}
function getUserRepos(username) {
    let userRepos = fetch(`https://api.github.com/users/${username}/repos`).then(raw => raw.json());
    return userRepos;
}


form.addEventListener("submit", (e) => {
    e.preventDefault();
    let username = input.value;
    getUserRepos(username).then(repos => {
          let languages = repos
    .map(repo => repo.language)
    .filter(lang => lang !== null);
            let languageCount = {};
            let langarray = [];
            languages.forEach(lang => {
                 languageCount[lang] === undefined ? languageCount[lang] = 1 : languageCount[lang]++;
            });
            let langsum = Object.values(languageCount).reduce((a,b) => a+b, 0);
            Object.keys(languageCount).forEach(lang => {
                languageCount[lang] = ((languageCount[lang] / langsum) * 100).toFixed(1) + "%";
                langarray.push({ lang: [lang] , percentage : languageCount[lang]});
            });
            
            
            languageContainer.innerHTML = "";
          RepoContainer.innerHTML = "";
             langarray.forEach(repo => {
            
           languageContainer.innerHTML += ` <div class="language">

            <div class="mb-2 flex justify-between text-xs">

                <span class="font-medium">
                    ${repo.lang}
                </span>

                <span class="text-slate-500">
                    ${repo.percentage}
                </span>

            </div>


            <div
                class="h-1.5 overflow-hidden rounded-full
                       bg-slate-200/70"
            >

                <div
                    class="h-full w-[${repo.percentage}] rounded-full
                           bg-yellow-400"
                ></div>

            </div>

        </div>

`
           
          })
     
            repos.forEach(repo => {
                RepoContainer.innerHTML +=    `<div
            class="repository rounded-2xl border border-white/80
                   bg-white/40 p-4
                   transition
                   hover:-translate-y-0.5
                   hover:bg-white/60"
        >

            <div
                class="flex items-start justify-between gap-4"
            >

                <div>

                    <h4 class="text-sm font-semibold">
                        ${repo.name}
                    </h4>

                    <p
                        class="mt-1 text-xs leading-5
                               text-slate-500"
                    >
                        ${repo.description || "No description available."}
                    </p>

                </div>


                <span
                    class="shrink-0 text-xs text-slate-500"
                >
                    ⭐ ${repo.stargazers_count}
                </span>

            </div>


            <!-- Repository metadata -->

            <div
                class="mt-3 flex flex-wrap gap-3
                       text-xs text-slate-500"
            >

                <span>
                    ${repo.language || "N/A"}
                </span>

                <span>
                    🍴 ${repo.forks_count}
                </span>

            </div>

        </div>
`
            });
           


        });

       



    
    
    getUserData(username).then(data => {
        
       
        profileContainer.innerHTML = `
       

            <div
                class="flex flex-col gap-8 md:flex-row"
            >


                <!-- Profile Image -->

                <div class="shrink-0">

                    <img
                        src="${data.avatar_url}"
                        alt="Profile picture"
                        class="h-64 w-full rounded-3xl object-cover
                               shadow-[0_15px_35px_rgba(0,0,0,0.12)]
                               md:h-64 md:w-64"
                    >

                </div>



                <!-- Profile Information -->

                <div class="flex flex-1 flex-col justify-center">


                    <!-- Name -->

                    <div class="flex items-center gap-2">

                        <h2
                            class="text-3xl font-bold tracking-[-1px]"
                        >
                            ${data.name || "No Name"}
                        </h2>


                        <!-- Verified -->

                        <span
                            class="flex h-6 w-6 items-center justify-center
                                   rounded-full bg-emerald-500
                                   text-xs font-bold text-white"
                        >
                            ✓
                        </span>

                    </div>


                    <!-- Username -->

                    <p class="mt-1 text-sm text-slate-500">
                        @${data.login}
                    </p>


                    <!-- Bio -->

                    <p
                        class="mt-5 max-w-lg text-sm leading-7
                               text-slate-600"
                    >
                        ${data.bio || "Bio not available."}
                    </p>



                    <!-- Details -->

                    <div
                        class="mt-5 flex flex-wrap gap-x-5 gap-y-3
                               text-xs text-slate-500"
                    >

                        <span class="flex items-center gap-1.5">
                            📍 ${data.location || "Location not available"}
                        </span>

                        <span class="flex items-center gap-1.5">
                            🔗 ${data.blog || "No blog available"}
                        </span>

                        <span class="flex items-center gap-1.5">
                            📅 Joined ${data.created_at ? new Date(data.created_at).toLocaleDateString() : "Jan 2020"}
                        </span>

                    </div>



                    <!-- Stats -->

                    <div
                        class="mt-6 grid grid-cols-2 rounded-2xl
                               border border-white/70
                               bg-white/40
                               p-4
                               backdrop-blur-xl
                               sm:grid-cols-4"
                    >

                        <div
                            class="border-b border-slate-200/60 p-2
                                   text-center sm:border-b-0
                                   sm:border-r"
                        >
                            <p class="text-xl font-bold">${data.followers}</p>
                            <p class="mt-1 text-xs text-slate-500">
                                Followers
                            </p>
                        </div>


                        <div
                            class="border-b border-slate-200/60 p-2
                                   text-center sm:border-b-0
                                   sm:border-r"
                        >
                            <p class="text-xl font-bold">${data.following}</p>
                            <p class="mt-1 text-xs text-slate-500">
                                Following
                            </p>
                        </div>


                        <div
                            class="border-b border-slate-200/60 p-2
                                   text-center sm:border-b-0
                                   sm:border-r"
                        >
                            <p class="text-xl font-bold">${data.public_repos}</p>
                            <p class="mt-1 text-xs text-slate-500">
                                Repositories
                            </p>
                        </div>


                        <div class="p-2 text-center">

                            <p class="text-xl font-bold">
                                ${data.public_gists}

                            </p>

                            <p class="mt-1 text-xs text-slate-500">
                                Gists
                            </p>

                        </div>

                    </div>



                    <!-- Profile Button -->

                    <button
                        class="mt-5 w-fit rounded-xl
                               border border-white
                               bg-white/60
                               px-6 py-3
                               text-sm font-semibold
                               shadow-sm
                               backdrop-blur-xl
                               transition
                               hover:-translate-y-0.5
                               hover:bg-white"
                    >
                        View Profile
                        <span class="ml-2">↗</span>
                    </button>

                </div>

            </div>

        


`
        reposContainer.innerHTML = `

             <div class="mb-5 flex items-center gap-3">

                    <div
                        class="flex h-10 w-10 items-center justify-center
                               rounded-xl bg-emerald-100/70
                               text-emerald-600"
                    >
                        ↗
                    </div>

                    <h3 class="font-semibold">
                        Profile Summary
                    </h3>

                </div>


                <div class="space-y-5">


                    <div
                        class="flex items-center justify-between
                               text-sm"
                    >

                        <span class="text-slate-500">
                            Public Repositories
                        </span>

                        <span class="font-semibold">
                            ${data.public_repos}
                        </span>

                    </div>


                    <div
                        class="flex items-center justify-between
                               text-sm"
                    >

                        <span class="text-slate-500">
                            Public Gists
                        </span>

                        <span class="font-semibold">
                            ${data.public_gists}
                        </span>

                    </div>


                  


                   

                </div>

        `

        aboutContainer.innerHTML = ` <div class="mb-5 flex items-center gap-3">

                    <div
                        class="flex h-10 w-10 items-center justify-center
                               rounded-xl bg-emerald-100/70
                               text-emerald-600"
                    >
                        ♙
                    </div>

                    <h3 class="font-semibold">
                        About
                    </h3>

                </div>


                <p
                    class="text-sm leading-7 text-slate-500"
                >
                    ${data.bio || "No bio available."}
                </p>`


    });

});