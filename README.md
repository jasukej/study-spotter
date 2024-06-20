# StudySpotter 🔎

<p align="center">
  <img src="https://github.com/jasukej/study-spotter/blob/main/public/images/Logo.png" alt="StudySpotter Logo" width="300" height="160"/>
</p>

<p align="center">
  <a href="https://shields.io" style="text-decoration: none;">
    <img alt="Build Status" src="https://img.shields.io/badge/build-passing-brightgreen" />
  </a>
  <a href="LICENSE" style="text-decoration: none;">
    <img alt="License" src="https://img.shields.io/badge/license-MIT-blue" />
  </a>
  <a href="https://github.com/jasukej/study-spotter/issues" style="text-decoration: none;">
    <img alt="GitHub issues" src="https://img.shields.io/github/issues/jasukej/study-spotter" />
  </a>
  <a href="https://github.com/jasukej/study-spotter/network" style="text-decoration: none;">
    <img alt="GitHub forks" src="https://img.shields.io/github/forks/jasukej/study-spotter" />
  </a>
  <a href="https://github.com/jasukej/study-spotter/stargazers" style="text-decoration: none;">
    <img alt="GitHub stars" src="https://img.shields.io/github/stars/jasukej/study-spotter" />
  </a>
</p>

StudySpotter is a web application designed to help students and professionals find the best study spots in their area. Users can search for study spots based on various filters such as location, noise level, facilities, and more. The application provides detailed information about each spot, including user reviews, ratings, and real-time open hours.

## Table of Contents

- [Features](#features)
- [Technologies Used](#built-using)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

🌎   **Discover and Filter**: Find study spots based on location, distance, institution, noise level, facilities, and categories.

🕒   **Real-time information**: Check real-time open hours, location, and other details for each spot.

➕   **Add your own spots**: Share a spot by clicking the add spot button.

⭐   **Review & bookmark study spots**: Bookmark your favorite study spots and add reviews to help others.

🏫   **Browse your campus' study scene**: View all buildings and study spots on your campus (currently supports only UBC, more institutions to come).

🤖   **Get ML-generated recommendations of similar spots**: Find similar spots using a cosine-similarity-based recommendation system.

## What's Next? 🚀
- Add support for other institutions.
- Implement workflow for users to add buildings and institutions.
- Add validation for study spots and institutions.
- Semantic search.
- Profile page revamp.
- Improved user experience.

## Built using

- **Frontend**:

  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Mantine UI](https://img.shields.io/badge/Mantine_UI-2D3748?style=flat&logo=mantine&logoColor=white)
![Google Maps API](https://img.shields.io/badge/Google_Maps_API-4285F4?style=flat&logo=google-maps&logoColor=white)

- **Backend**:

  ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
  ![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=flat&logo=prisma&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
  ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)

- **APIs and Libraries**:
  
  ![nlptown](https://img.shields.io/badge/nlptown-20232A?style=flat&logo=huggingface&logoColor=61DAFB)
  ![@xenova/transformers](https://img.shields.io/badge/%40xenova/transformers-20232A?style=flat&logo=huggingface&logoColor=61DAFB)
  ![Google Maps API](https://img.shields.io/badge/Google_Maps_API-4285F4?style=flat&logo=google-maps&logoColor=white)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-4285F4?style=flat&logo=cloudinary&logoColor=white)

## Installation

### Prerequisites

- Node.js and npm
- MongoDB
- Redis

### Steps

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/study-spotter.git
    cd study-spotter
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your environment variables:
    ```env
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    OPENAI_API_KEY=your_openai_api_key
    REDIS_URL=your_redis_url
    DATABASE_URL=your_mongodb_connection_string
    ```

4. **Run the development server**:
    ```sh
    npm run dev
    ```

5. **Open the application**:
    Open your browser and go to [http://localhost:3000](http://localhost:3000).

## Usage

1. **Search for Study Spots**:
   - Use the search bar to filter study spots based on your preferences.

2. **View Study Spot Details**:
   - Click on a study spot to view detailed information including user reviews, ratings, and open hours.

3. **Add Reviews**:
   - Write reviews and rate the study spots you have visited.

4. **Get Recommendations**:
   - View recommended study spots similar to the one you are currently viewing.

## Contributing

We welcome contributions to improve StudySpotter. Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

For any questions or issues, please open an issue on GitHub or contact the maintainer.

Happy Studying! 📚✨
