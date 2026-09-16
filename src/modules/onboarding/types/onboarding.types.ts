export interface Church {
  churchID: string;

  churchName: string;

  churchAddress?: string;

  churchLogo?: string;
}

export interface ChurchPastor {
  name: string;

  photoUrl?: string;

  bio?: string;

  title?: string;
}

export interface ChurchBranch {
  branchName: string;

  address: string;

  pastorName?: string;

  pastorDetails?: string;

  pastorPictureUrl?: string;

  phone?: string;

  email?: string;

  details?: string;
}

export interface ChurchAbout {
  title: string;

  details: string;
}