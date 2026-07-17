import mongoose, { Document, Schema } from 'mongoose';

export interface ISiteSettings extends Document {
  email: string;
  phone: string;
  address: string;
  emailSubject: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  siteTitle: string;
  siteDescription?: string;
}

const siteSettingsSchema = new Schema<ISiteSettings>(
  {
    email: { type: String, default: 'lee@elephantproduction.com' },
    phone: { type: String, default: '+972-54-2804049' },
    address: { type: String, default: 'Dizengoff ST, 123, Tel Aviv' },
    emailSubject: { type: String, default: 'Project Inquiry' },
    instagram: { type: String },
    facebook: { type: String },
    linkedin: { type: String },
    siteTitle: { type: String, default: 'Elephant Production' },
    siteDescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ISiteSettings>('SiteSettings', siteSettingsSchema);
