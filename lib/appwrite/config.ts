import { Client, Account, Databases, ID, Query } from "appwrite";

// Define Credential Types
interface CredType {
    projectID: string;
    databaseID: string;
    userCollectionID: string;
    watchListCollectionID: string;
    playListCollectionID: string;
}

// Define User Types
interface UserType {
    email: string;
    password: string;
    username?: string;
}

export const creds: CredType = {
    projectID: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '',
    databaseID: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '',
    userCollectionID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_USERS_ID || '',
    watchListCollectionID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_WATCHLIST || '',
    playListCollectionID: process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_PLAYLIST_ID || '',
};

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // API Endpoint
    .setProject(creds.projectID);

const account = new Account(client);
const database = new Databases(client);

// **Create User Account**
export const createAccount = async (user: UserType) => {
    try {
        const result = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.username || ""
        );
        return result;
    } catch (error) {
        console.error("Error creating account:", error);
        throw error;
    }
};

// **Login Function**
export const login = async (email: string, password: string) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

// **Logout Function**
export const logout = async () => {
    try {
        await account.deleteSession('current');
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};

// **Check Login Persistence**
export const getCurrentUser = async () => {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        console.error("No active session found:", error);
        return null;
    }
};

// **Add to Watchlist**
export const addToWatchlist = async (movieId: number) => {
    try {
        const loggedUser = await getCurrentUser();
        if (!loggedUser) throw new Error("User not found or not logged in");
        const userId = loggedUser.$id;

        const watchlistQuery = await database.listDocuments(
            creds.databaseID,
            creds.watchListCollectionID,
            [Query.equal("userId", userId)]
        );

        if (watchlistQuery.total > 0) {
            const existingWatchlist = watchlistQuery.documents[0];
            
            // Convert existing and new movieId to integers for consistency
            const updatedMovieIds = [
                ...new Set([...existingWatchlist.movieId, parseInt(movieId)])
            ];

            const result = await database.updateDocument(
                creds.databaseID,
                creds.watchListCollectionID,
                existingWatchlist.$id,
                { movieId: updatedMovieIds }
            );
            return result;
        } else {
            const result = await database.createDocument(
                creds.databaseID,
                creds.watchListCollectionID,
                ID.unique(),
                {
                    userId,
                    movieId: [parseInt(movieId)]  // Ensure array of integers
                }
            );
            return result;
        }
    } catch (error) {
        console.error("Error adding to watchlist:", error);
        throw error;
    }
};



// **Remove From Watchlist**
export const removeFromWatchlist = async (movieId) => {
  try {
    const loggedUser = await getCurrentUser();
    if (!loggedUser) throw new Error("User not found or not logged in");

    // Step 1: List documents that match userId and movieId
    const watchlistItems = await database.listDocuments(
      creds.databaseID,
      creds.watchListCollectionID,
      [
        Query.equal("userId", [loggedUser.$id]),
        Query.equal("movieId", [movieId])
      ]
    );

    // Step 2: Delete each matching document by ID
    for (const item of watchlistItems.documents) {
      await database.deleteDocument(
        creds.databaseID,
        creds.watchListCollectionID,
        item.$id // Use the document's ID here
      );
    }

    console.log("Successfully removed from watchlist.");
  } catch (error) {
    console.error("Error removing from watchlist:", error.message);
    throw error;
  }
};


// **Add to Playlist**
export const addToPlaylist = async (userId: string, movieId: string) => {
    try {
        const result = await database.createDocument(
            creds.databaseID,
            creds.playListCollectionID,
            ID.unique(),
            { userId, movieId }
        );
        return result;
    } catch (error) {
        console.error("Error adding to playlist:", error);
        throw error;
    }
};

// ** Get Watchlist
export const getWatchlist = async (userId: string) => {
    try {
        const result = await database.listDocuments(
            creds.databaseID,
            creds.watchListCollectionID,
            [
                Query.equal("userId", userId)
            ]
        );
        return result;
    } catch (error) {
        console.error("Error fetching watchlist:", error);
        throw error;
    }
};

// ** Check Watchlist against a movieId
export const checkWatchlist = async (movieId: string) => {
    try {
        const loggedUser = await getCurrentUser();
        if (!loggedUser) throw new Error("User not found or not logged in");

        // console.log(movieId)

        const result = await database.listDocuments(
            creds.databaseID,
            creds.watchListCollectionID,
            [
                Query.equal("userId", loggedUser.$id),
                Query.equal("movieId", [movieId])
            ]
        );

        // Check if the movie is in the user's watchlist
        return result.total > 0; 
    } catch (error) {
        console.error("Error checking watchlist:", error);
        throw error;
    }
};

