# `/api/image/random` docs

Endpoint simply redirects to a random image from the database using the `/api/image/<id>` endpoint

Example usage

```html
<img src="https://cuteboys.love/api/image/random" />
```

```bash
curl -L cuteboys.love/api/image/random -o image
```

```python
import requests

try:
	response = requests.get("https://cuteboys.love/api/image/random", stream=True)
	response.raise_for_status()

	with open("image", 'wb') as file:
		for chunk in response.iter_content(chunk_size=8192):
			if chunk:
				file.write(chunk)
except Exception as e:
	print(e)
```
