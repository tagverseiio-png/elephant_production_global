import mongoose, { Document, Schema } from 'mongoose';

export interface IReview {
  text: string;
  source: string;
}

export interface IAward {
  logo?: string;
  category?: string;
  title?: string;
}

export interface ICredit {
  role: string;
  name: string;
}

export interface IFilm extends Document {
  id: string;
  title: string;
  category: string;
  year: string;
  director: string;
  stillImage: string;
  trailerVideo?: string;
  hero_image?: string;
  director_image?: string;
  gallery_images?: string[];
  awardYear?: string;
  awardLaurel?: string;
  awardLogo?: string;
  reviews: IReview[];
  awards: IAward[];
  credits: ICredit[];
  investors?: string;
  order: number;
  published: boolean;
}

const reviewSchema = new Schema<IReview>(
  {
    text: { type: String, required: true },
    source: { type: String, required: true },
  },
  { _id: false }
);

const awardSchema = new Schema<IAward>(
  {
    logo: { type: String },
    category: { type: String },
    title: { type: String },
  },
  { _id: false }
);

const creditSchema = new Schema<ICredit>(
  {
    role: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false }
);

const filmSchema = new Schema<IFilm>(
  {
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    year: { type: String, required: true },
    director: { type: String, required: true },
    stillImage: { type: String, required: true },
    trailerVideo: { type: String },
    hero_image: { type: String },
    director_image: { type: String },
    gallery_images: [{ type: String }],
    awardYear: { type: String },
    awardLaurel: { type: String },
    awardLogo: { type: String },
    reviews: { type: [reviewSchema], default: [] },
    awards: { type: [awardSchema], default: [] },
    credits: { type: [creditSchema], default: [] },
    investors: { type: String },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFilm>('Film', filmSchema);
