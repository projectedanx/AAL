import re

with open('App.tsx', 'r') as f:
    content = f.read()

# Make sure we pass jur down to ImageGrid
image_grid_search = """            <ImageGrid
              images={currentImages}
              isLoading={isLoading}
              onRateImage={handleRateImage}
              error={error}
            />"""

image_grid_replace = """            <ImageGrid
              images={currentImages}
              isLoading={isLoading}
              onRateImage={handleRateImage}
              error={error}
              jur={currentGeneration?.jur}
            />"""

content = content.replace(image_grid_search, image_grid_replace)

# Make sure currentGeneration is available
current_generation_search = "const currentImages = currentGeneration ? currentGeneration.images : [];"
current_generation_replace = """const currentGeneration = generations.find(g => g.id === currentGenerationId);
  const currentImages = currentGeneration ? currentGeneration.images : [];"""

# if it's already there don't duplicate
if "const currentGeneration = generations.find" not in content:
   content = content.replace(current_generation_search, current_generation_replace)

with open('App.tsx', 'w') as f:
    f.write(content)
