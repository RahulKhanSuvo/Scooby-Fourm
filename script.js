const loadAllPosts = async (searchText) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts${
      searchText ? `?category=${searchText}` : ""
    }`
  );
  const data = await response.json();
  displayAllPost(data.posts);
};
const displayAllPost = (posts) => {
  const postContainer = document.getElementById("post-container");
  postContainer.innerHTML = "";
  posts.forEach((post) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div
                        class="max-w-2xl mx-auto p-4 rounded-xl shadow-lg border border-gray-200 hover:shadow-xl hover:border-blue-300 transition duration-300 ease-in-out">
                        <div class="flex p-6 gap-4">
                            <!-- Left side: Thumbnail/Profile Image -->
                            <div class="relative">
                                <img src=${post.image} alt="Profile Picture"
                                    class="h-16 w-20 rounded-lg object-cover bg-gray-200">
                                <!-- Status Indicator -->
                                <span
                                    class="absolute top-0 left-0 h-3 w-3 bg-green-500 border border-white rounded-full"></span>
                            </div>

                            <!-- Right side: Content -->
                            <div class="">
                                <!-- Category and Author -->
                                <div class="text-sm text-gray-500 flex items-center gap-2">
                                    <span class="font-medium text-blue-500">#${post.category}</span>
                                    <span>Author:${post.author.name}</span>
                                </div>

                                <!-- Title -->
                                <div class="border-b py-4 border-dashed ">
                                    <h2 class="text-lg font-semibold text-gray-800">${post.title}</h2>

                                    <!-- Description -->
                                    <p class="text-gray-600 text-sm mt-1">
                                      ${post.description}
                                    </p>
                                </div>

                                <!-- Stats: Views, Likes, Time -->
                                <div class="flex items-center gap-4 mt-2 text-gray-500 text-sm">
                                    <div class="flex items-center gap-1">
                                        <!-- FontAwesome Eye Icon for Views -->
                                        <i class="fas fa-eye"></i>
                                        <span>${post.comment_count}</span>
                                    </div>

                                    <div class="flex items-center gap-1">
                                        <!-- FontAwesome Heart Icon for Likes -->
                                        <i class="fas fa-heart"></i>
                                        <span>${post.view_count}</span>
                                    </div>

                                    <div class="flex items-center gap-1">
                                        <!-- FontAwesome Clock Icon for Time -->
                                        <i class="fas fa-clock"></i>
                                        <span>${post.posted_time} min</span>
                                    </div>
                                </div>
                            </div>

                            <!-- Action Icon -->
                            <div class="flex items-center">
                                <!-- FontAwesome Mail Open Icon -->
                                <button onclick="markAsRead('${post.description}','${post.view_count}')" class="text-green-500 hover:text-green-700">
                                    <i class="fas fa-envelope-open fa-lg"></i>
                                </button>
                            </div>
                        </div>
                    </div>
    `;
    postContainer.appendChild(div);
  });
};
const handleSearchByCategory = () => {
  const searchText = document.getElementById("searchPosts").value;
  loadAllPosts(searchText);
};
const markAsRead = (dis, count) => {
  const markAsReadContainer = document.getElementById("markAsReadContainer");
  handelCount();
  const div = document.createElement("div");
  div.innerHTML = `
   <div class="flex gap-2 items-center rounded-lg p-3 bg-white justify-between">
                                <h2>${dis}</h2>
                                <p>
                                  <i class="fas fa-heart"></i>   ${count}
                                </p>
                            </div>
  `;
  markAsReadContainer.appendChild(div);
  console.log(dis, count);
};
const handelCount = () => {
  const preCount = document.getElementById("markAsReadCounter").innerText;
  let sum = parseInt(preCount) + 1;
  console.log(sum);
  document.getElementById("markAsReadCounter").innerText = sum;
};
loadAllPosts();
