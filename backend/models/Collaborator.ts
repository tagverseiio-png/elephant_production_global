import mongoose, { Document, Schema } from 'mongoose';

export interface ICollaborator extends Document {
  name: string;
  type: string;
  logo?: string;
  url?: string;
  order: number;
}

const collaboratorSchema = new Schema<ICollaborator>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    logo: { type: String },
    url: { type: String },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model<ICollaborator>('Collaborator', collaboratorSchema);
