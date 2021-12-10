import css from "../../assets/scss/modules/Edit.module.scss";

const EditContacts = () => {
  return (
    <div className={css.editWrapper}>
      <div className={css.editWrapperHeader}>Контакты</div>
      <div className={css.editWrapperContent}>
        <form id="edit-contacts"></form>
      </div>
      <div className={css.editWrapperFooter}>
        <button className="btn btn-primary" form="edit-contacts">
          Сохранить
        </button>
      </div>
    </div>
  );
};

export default EditContacts;
