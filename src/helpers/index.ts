import firebase from 'firebase/app';

export const getUserLocale = () =>
  /^(?<locale>[a-z]{2})-[A-Z]{2}$/.exec(navigator.language)?.groups?.locale || 'en';

export const FirestoreWrapper = (userId: string) => {
  const db = firebase.firestore();
  const user = () => db.collection('users').doc(userId);
  const workplace = (workplaceId: string | undefined = undefined) =>
    user()
      .collection('workplaces')
      .doc(workplaceId);
  const shift = (shiftId: string | undefined = undefined) =>
    user()
      .collection('shifts')
      .doc(shiftId);

  return {
    user,
    workplace,
    shift,
  };
};

export class PageTitleManager {
  private _baseTitle: string;

  public constructor(baseTitle: string) {
    this._baseTitle = baseTitle;
  }

  public updateTitle(titleSegment: string): string {
    document.title = `${this._baseTitle} - ${titleSegment}`;

    return document.title;
  }
}
