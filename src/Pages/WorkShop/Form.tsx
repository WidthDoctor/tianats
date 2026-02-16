import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./form.css"; // Импорт CSS для стилизации формы

const WeddingForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    weddingDate: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]); // Для хранения загруженных файлов
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Обработчик изменения данных формы
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик изменения файлов
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      console.log("Selected files:", selectedFiles); // Лог для проверки выбранных файлов
      setFiles(selectedFiles);
    }
  };

  // Преобразование файла в Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log(`File ${file.name} converted to Base64`);
        resolve(reader.result as string);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("handleSubmit called");
    setLoading(true);
    setError(null);
    setSuccess(false);
    console.log("Files state:", files); // Проверяем состояние files
    try {
      // Преобразование файлов в Base64
      const base64Files = await Promise.all(
        files.map((file) => convertFileToBase64(file)),
      );
      console.log("Base64 Files:", base64Files);

      const templateParams = {
        from_name: formData.name,
        to_name: "Recipient Name",
        message: `
          Email: ${formData.email}
          Wedding Date: ${formData.weddingDate}
          Message: ${formData.message}
        `,
        images: base64Files.join(","), // Отправляем все изображения в одной строке, разделяя их запятыми
      };

      await emailjs.send(
        "service_tlzmjjy", // Service ID
        "template_u6ybkip", // Template ID
        templateParams,
        "XfJYYRfL9nWb6I0iI", // User ID
      );

      setSuccess(true);
      setFormData({ name: "", email: "", weddingDate: "", message: "" });
      setFiles([]); // Очищаем загруженные файлы
    } catch (error) {
      console.error("Ошибка отправки формы:", error);
      setError("Произошла ошибка при отправке. Попробуйте снова.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="workshop-form">
      <h1>Форма для заявки</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="field">
            <label>
              Имя
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="field">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>
              Дата свадьбы
              <input
                type="date"
                name="weddingDate"
                value={formData.weddingDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>
              Сообщение
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>

        <div className="form-row">
          <div className="field">
            <label>
              Загрузить файлы
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
            <div className="small">
              Можно загрузить несколько изображений (jpg, png).
            </div>
          </div>
        </div>

        {loading && <p className="small">Отправка...</p>}
        {error && <p className="error">{error}</p>}
        {success && <p className="small">Форма успешно отправлена!</p>}

        <div className="actions">
          <button type="submit" disabled={loading}>
            {loading ? "Отправка…" : "Отправить"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WeddingForm;
