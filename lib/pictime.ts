// TEMPORARY — client-confirmation image streams from the Pic-Time gallery
// "Porfolio India" (projectId 51683358). These hotlink Pic-Time's CDN directly
// so the client can confirm real portfolio photos on the site.
//
// TO REVERT: point lib/data.ts image URLs back to the final assets and delete
// this file.
//
// WARNING: the gallery invite token is embedded in these URLs, so anyone who
// views the site source can open the full low-res gallery. Revoke/rotate the
// Pic-Time share link when confirmation is done. If the gallery goes offline
// or the link is revoked, these images will break — that is expected.

const PICTIME_BASE =
  'https://pictime6eus1public-pub-f5djhafrcqd3djf7.a02.azurefd.net/pictures/51/683/51683358/1yk1vf077rtp9urcmk/lowres';

export const pictimeLowres = (photoId: number) =>
  `${PICTIME_BASE}/${photoId}.jpg`;

// Curated photo IDs per gallery scene (verified HTTP 200, image/jpeg).
export const PICTIME_IDS = {
  carousel: [12081058207, 12081237349, 12081244117, 12084450054, 12084356091],
  serviceWedding: 12081058212,
  servicePreWedding: 12081237338,
  serviceMaternity: 12081244954,
  workAishaMain: 12081058209,
  workAishaGallery: [12081058215, 12081212277],
  workEleganceMain: 12081237333,
  workEleganceGallery: [12081042840, 12081237344],
  workSharmaMain: 12084424489,
  workSharmaGallery: [12084444544, 12084450055],
  // TEMPORARY extension: more Pic-Time scenes as portfolio works.
  workEngagementMain: 12084023374,
  workEngagementGallery: [11891823966, 12084023388],
  workNikkahMain: 11891826242,
  workNikkahGallery: [11891826245, 11891826249],
  workReceptionMain: 12081053763,
  workReceptionGallery: [12081053170, 12081055145],
  workPostWedMain: 12081079222,
  workPostWedGallery: [12081079230, 12081209768],
  workMaternityMain: 12081244119,
  workMaternityGallery: [12081244121, 12081244123],
  workChettinadMain: 12084424494,
  workChettinadGallery: [12084450050, 12084450064],
  workKeralaMain: 12084403371,
  workKeralaGallery: [12084419283, 12084403387],
  workPondiMain: 12084386964,
  workPondiGallery: [12084386982, 12084387000],
  workStreetMain: 12084356076,
  workStreetGallery: [12084356086, 12084356106],
  workModelMain: 11891938404,
  workModelGallery: [11891938400, 11891938405],
};

export const PICTIME_GALLERY_URL =
  'https://elephantproduction.pic-time.com/-porfolioindia/gallery?inviteptoken2=AAAAANQAAACPB3HHKeEz3iK8At-ys3yhDzdc';
