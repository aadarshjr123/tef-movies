import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface PlayingVideo {
  youtubeId: string;
  name: string;
}

interface PlayerState {
  video: PlayingVideo | null;
}

/**
 * The trailer player is one modal shared by the whole app. Any trailer
 * thumbnail (home carousel, title pages) opens it by dispatching an action,
 * instead of each component embedding its own player.
 */
const playerSlice = createSlice({
  name: "player",
  initialState: { video: null } as PlayerState,
  reducers: {
    trailerOpened(state, action: PayloadAction<PlayingVideo>) {
      state.video = action.payload;
    },
    trailerClosed(state) {
      state.video = null;
    },
  },
  selectors: {
    selectPlayingVideo: (state) => state.video,
  },
});

export const { trailerOpened, trailerClosed } = playerSlice.actions;
export const { selectPlayingVideo } = playerSlice.selectors;
export default playerSlice;
